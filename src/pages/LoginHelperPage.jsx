import React, { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { Box, Button, Center, Heading, Input, Text } from '@chakra-ui/react'

export default function LoginHelperPage() {
  const [key, setKey] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = (e) => {
    e.preventDefault()
    setIsLoading(true)
    const makeDriverLogin = async () => {
      const { data, error } = await supabase.from('keyboardless_login').insert({ key: key, email: email, password: password })
      setTimeout(() => setIsLoading(false), 150)
    }
    makeDriverLogin()
  }

  return (
    <Center height={'full'} background={'#e1e2e1'}>
      <Box background={'white'} color={'#555'} className="loginHelperContainer" p={'25px'} width={'full'} style={{boxShadow: '0px 0px 25px rgba(0, 0, 0, 0.2)'}}>
        <Heading as='h2' size='lg' color={'#555'} mb={'20px'} textAlign={'center'}>Login Helper for Drivers</Heading>
        <Box>
          <Text fontWeight={500} mb='8px'>Access Key</Text>
          <Input mb={'16px'} value={key} onChange={(e) => setKey(e.target.value)} type="text" id="key" name="key" placeholder="Enter your access Key" />

          <Text fontWeight={500} mb='8px'>Email</Text>
          <Input mb={'16px'} value={email} onChange={(e) => setEmail(e.target.value)} type="text" id="email" name="email" placeholder="Enter your email" />

          <Text fontWeight={500} mb='8px'>Password</Text>
          <Input mb={'16px'} value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" placeholder="Enter your password" />

          {/* <input onClick={handleClick} type="submit" value={!isLoading ? "Login" : 'Loading'} style={{width: '100%'}} /> */}
          <Button colorScheme={'blue'} background={'blue.400'} onClick={handleClick} width={'full'} isLoading={isLoading}>Login</Button>
        </Box>
      </Box>
    </Center>
  )
}