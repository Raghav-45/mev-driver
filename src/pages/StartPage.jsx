import React from 'react'
import { Header, Softkey } from "../components"
import { useCustomRouter } from '../contexts/CustomRouter'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabaseClient'

export default function StartDriving() {
  const { currentUser, logout } = useAuth()
  const { navigate } = useCustomRouter()
  return (
    <>
      <Header title="My Electric Vehicle" />

      <p style={{paddingInline: '25px', fontSize: '15px'}}>This is Start Page in which Driver will see a Map and Get a option to Accept or Reject Rides</p>

      <Softkey
        left={'Accept✅'}
        // onKeyLeft={() => navigate('/account')}
        center={'Home'}
        onKeyCenter={() => navigate('/')} // TODO: Show Home Page Button only when there is no Rides currently, means no-oen is in vehicle
        right={'Reject❌'}
        // onKeyRight={() => navigate('/start-driver')}
      />
    </>
  )
}