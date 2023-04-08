import React from 'react'
import { Header, Softkey } from "../components"
import { useCustomRouter } from '../contexts/CustomRouter'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabaseClient'

export default function StartDriving() {
  const { currentUser, logout } = useAuth()
  const { navigate } = useCustomRouter()
  return (
    <div className='flex flex-col h-[calc(100%-32px)] w-full'>
      <Header title="My Electric Vehicle" />

      {/* <p className='px-[20px] text-xs'>This is Start Page in which Driver will see a Map and Get an option to Accept or Reject Rides</p> */}
      <div className='flex flex-col text-center flex-1'>
        <div className='my-auto'>
          <p className='px-[20px] text-xs'>This is Start Page in which Driver will see a Map and Get an option to Accept or Reject Rides</p>
        </div>
      </div>

      <Softkey
        left={'Accept✅'}
        // onKeyLeft={() => navigate('/account')}
        center={'Home'}
        onKeyCenter={() => navigate('/')} // TODO: Show Home Page Button only when there is no Rides currently, means no-oen is in vehicle
        right={'Reject❌'}
        // onKeyRight={() => navigate('/start-driver')}
      />
    </div>
  )
}