import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../contexts/AuthContext'

export const AnotherDeviceAuth = () => {
  const [key, setKey] = useState(generateRandomKey())
  const [loginDetailsReceived, setLoginDetailsReceived] = useState()
  const [loginState, setLoginState] = useState()
  const { currentUser, logout } = useAuth()

  function generateRandomKey() { // O & 0 is Excluded from Key for making it easy to speak
    const characters = 'ABCDEFGHIJKLMNPQRSTUVWXYZ'
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return String(String(getRandomInt(1, 9)) + characters.charAt(getRandomInt(0, 24)) + String(getRandomInt(1, 9)) + characters.charAt(getRandomInt(0, 24)))
  }

  const generateNewKey = () => {setKey(generateRandomKey())}

  useEffect(() => {
    loginState == 'success' && currentUser && console.log('redirect')
  }, [currentUser, loginState])

  useEffect(() => {
    const sub = supabase.channel('any')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'keyboardless_login', filter: `key=eq.${key}` }, payload => {
        console.log('Change received!', payload)
        setLoginDetailsReceived(payload.new)
      }).subscribe()
    return () => {
      supabase.removeChannel(sub)
    }
  }, [key])

  useEffect(() => {
    const loginWithReceivedDetails = async (email, pass) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: pass,
      })

      if (error) {console.log('Wrong Details Received.'); generateNewKey(); setLoginState(); setLoginDetailsReceived(); return;}
      data && console.log('Login Success.'); setLoginState('success');
    }
    loginDetailsReceived && loginWithReceivedDetails(loginDetailsReceived.email, loginDetailsReceived.password)
  }, [loginDetailsReceived])
  
  return (
    <div style={{textAlign: 'center', margin: 'auto', paddingTop: '60px'}}>
      <p style={{textAlign: 'center', margin: '0'}}>Use this Code to Login</p>
      <h3 style={{textAlign: 'center', margin: '0', marginTop: '0.65rem'}}>{key}</h3>
      <h6 style={{textAlign: 'center', margin: '0', marginTop: '1rem'}}>{loginState == 'success' && 'Successfully Logged in!'}</h6>
    </div>
  )
}