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
    <div className="loginHelperContainer w-full">
      <h1 className='text-3xl font-bold'>Login Helper for Drivers</h1>
      {/* <div>
        <label className='font-semibold mb-[4px]' for="key">Access Key</label>
        <input className='appearance-none border mb-[20px] rounded-lg w-full' value={key} onChange={(e) => setKey(e.target.value)} type="text" id="key" name="key" placeholder="Enter your access Key" />

        <label className='font-semibold mb-[4px]' for="email">Email</label>
        <input className='appearance-none border mb-[20px] rounded-lg w-full' value={email} onChange={(e) => setEmail(e.target.value)} type="text" id="email" name="email" placeholder="Enter your email" />

        <label className='font-semibold mb-[4px]' for="password">Password</label>
        <input className='appearance-none border mb-[20px] rounded-lg w-full' value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" placeholder="Enter your password" />

        <button onClick={handleClick} className='w-full rounded-lg'>Login</button>
      </div> */}

      <div>
        <div class="grid grid-cols-6 gap-4">
          <div class="col-start-1 col-span-4 col-end-3">
            <input className='appearance-none border mb-[16px] rounded-lg w-full' value={key} onChange={(e) => setKey(e.target.value)} type="text" id="key" name="key" placeholder="Key" />
          </div>
          <div class="col-start-3 col-span-4 col-end-7">
            <input className='appearance-none border mb-[16px] rounded-lg w-full' value={email} onChange={(e) => setEmail(e.target.value)} type="text" id="email" name="email" placeholder="Enter email" />
          </div>
        </div>
        <input className='appearance-none border mb-[20px] rounded-lg w-full' value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" placeholder="Enter password" />

        <button onClick={handleClick} className='w-full rounded-lg'>Login</button>
      </div>
      <style dangerouslySetInnerHTML={{ __html: "#root {background: #e1e2e1;}" }} />
    </div>
  )
}