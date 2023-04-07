import React, { useState, useEffect } from 'react'
import { Header, Softkey } from "../components"
import { useNavigation } from "../hooks/useNavigation"
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabaseClient'

export default function Accountpage() {
  const [current, setNavigation] = useNavigation()

  const [key, setKey] = useState(generateRandomKey())
  const [loginDetailsReceived, setLoginDetailsReceived] = useState()
  const [loginState, setLoginState] = useState()
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  const onKeyCenter = () => {
    const currentElement = document.querySelector("[nav-selected=true]");
    const currentNavigationIndex = parseInt(
      currentElement.getAttribute("nav-index"),
      10
    )

    // const isATask = currentNavigationIndex > 0;
    // if (isATask) {
    //   setToDo(prevState => {
    //     const current = [...prevState];
    //     current[currentNavigationIndex - 1].completed = !current[
    //       currentNavigationIndex - 1
    //     ].completed;
    //     return current;
    //   });
    // } else if (currentElement.value.length) {
    //   const toDo = { name: currentElement.value, completed: false };
    //   setToDo(prevState => [...prevState, toDo]);
    //   currentElement.value = "";
    // }
  }

  const onKeyRight = () => {
    // const currentIndex = parseInt(
    //   document.querySelector("[nav-selected=true]").getAttribute("nav-index"),
    //   10
    // );
    currentUser ? console.log('doing logout') : console.log('nothing')
    currentUser && logout()
    // if (currentIndex > 0) {
    //   setToDo(prevState => {
    //     const current = [...prevState];
    //     current.splice(currentIndex - 1, 1);
    //     const goToPreviousElement = Boolean(current.length);
    //     setNavigation(goToPreviousElement ? currentIndex - 1 : 0);
    //     return current;
    //   });
    // }
  }

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
      data && console.log('Login Success.'); setLoginState('success'); navigate('/', { replace: true });
    }
    loginDetailsReceived && loginWithReceivedDetails(loginDetailsReceived.email, loginDetailsReceived.password)
  }, [loginDetailsReceived])

  return (
    <>
      <Header title="My Electric Vehicle" />

      <div style={{textAlign: 'center', margin: 'auto', paddingTop: '4rem'}}>
        <p style={{textAlign: 'center', margin: '0'}}>Use this Code to Login</p>
        <h3 style={{textAlign: 'center', margin: '0', marginTop: '0.65rem'}}>{key}</h3>
        <h6 style={{textAlign: 'center', margin: '0', marginTop: '1rem'}}>{loginState == 'success' && 'Successfully Logged in!'}</h6>
      </div>

      <Softkey
        left={'Home'}
        onKeyLeft={() => navigate('/', { replace: true })}
        // center={current.type === "INPUT" ? "Insert" : "Toggle"}
        // onKeyCenter={onKeyCenter}
        right={currentUser ? 'logout' : ''}
        onKeyRight={() => logout()}
      />
    </>
  );
}