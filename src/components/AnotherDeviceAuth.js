import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export const AnotherDeviceAuth = () => {
  const [key, setKey] = useState(generateRandomKey())
  const [loginDetailsReceived, setLoginDetailsReceived] = useState()

  function generateRandomKey() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return String(String(getRandomInt(0, 9)) + characters.charAt(getRandomInt(0, 25)) + String(getRandomInt(0, 9)) + characters.charAt(getRandomInt(0, 25)))
  }

  const generateNewKey = () => {setKey(generateRandomKey())}

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

      if (error) {console.log('Wrong Details Received.'); generateNewKey(); setLoginDetailsReceived(); return;}
      data && console.log('Login Success.')
    }
    loginDetailsReceived && loginWithReceivedDetails(loginDetailsReceived.email, loginDetailsReceived.password)
  }, [loginDetailsReceived])
  
  return (
    key && <div>{key}{loginDetailsReceived && ' - Login Details received'}</div>
  )
}