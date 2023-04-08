import React from 'react'
import { Header, Softkey } from "../components"
import { useCustomRouter } from '../contexts/CustomRouter'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabaseClient'
import { Flex, Text } from '@chakra-ui/react'

export default function StartDriving() {
  const { currentUser, logout } = useAuth()
  const { navigate } = useCustomRouter()
  return (
    <Flex direction={'column'} height={'calc(100% - 32px)'} width={'100%'}>
      <Header title="My Electric Vehicle" />

      <Text px={'16px'} fontSize='sm'>This is Start Page in which Driver will see a Map and Get an option to Accept or Reject Rides</Text>

      <Softkey
        left={'Accept✅'}
        // onKeyLeft={() => navigate('/account')}
        center={'Home'}
        onKeyCenter={() => navigate('/')} // TODO: Show Home Page Button only when there is no Rides currently, means no-oen is in vehicle
        right={'Reject❌'}
        // onKeyRight={() => navigate('/start-driver')}
      />
    </Flex>
  )
}