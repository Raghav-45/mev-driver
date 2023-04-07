import React, { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function LoginHelperPage() {
  const [key, setKey] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const handleClick = (e) => {
    e.preventDefault()
    const makeDriverLogin = async () => {
      const { data, error } = await supabase.from('keyboardless_login').insert({ key: key, email: email, password: password })
    }
    makeDriverLogin()
  }

  return (
    <div className="loginHelperContainer" style={{width: '100%'}}>
      <h1>Login Helper for Drivers</h1>
      <div>
        <label for="key">Access Key</label>
        <input value={key} onChange={(e) => setKey(e.target.value)} type="text" id="key" name="key" placeholder="Enter your access Key" />

        <label for="email">Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" id="email" name="email" placeholder="Enter your email" />

        <label for="password">Password</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" placeholder="Enter your password" />

        {/* <input onClick={handleClick} type="submit" value={!isLoading ? "Login" : 'Loading'} style={{width: '100%'}} /> */}
        <button onClick={handleClick} style={{width: '100%'}}>Login</button>
      </div>
    </div>
  )
}