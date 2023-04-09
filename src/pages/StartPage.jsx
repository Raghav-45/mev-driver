import React, { useEffect, useState } from 'react'
import { Header, Softkey, ToDos } from "../components"
import { useCustomRouter } from '../contexts/CustomRouter'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabaseClient'

export default function StartDriving() {
  const { currentUser, logout } = useAuth()
  const { navigate } = useCustomRouter()
  const [driver, setDriver] = useState()
  const [watchForRealtimeChanges, setWatchForRealtimeChanges] = useState(false)

  const [rides, setRides] = useState([])

  const getDriverDetails = async () => {
    const { error, data } = await supabase.from('profile_driver').select().eq('username', currentUser.user_metadata.username.toLowerCase()).maybeSingle()
    console.log(data)
    return data
  }

  useEffect(() => {
    currentUser && getDriverDetails().then((e) => {setDriver(e); setWatchForRealtimeChanges(true);})
  }, [currentUser])

  useEffect(() => {
    const sub = watchForRealtimeChanges && supabase.channel('any')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'rides', filter: `driver_id=eq.${driver.id}` }, payload => {
        console.log('Change received!', payload)
        setRides((current) => [...current, payload.new])
        // toast({
        //   title: `New ride - ${driver && driver.id}`,
        //   description: `from (${payload.new.pickup_loc}) - (${payload.new.drop_loc}) for ${payload.new.fare}Rs`,
        //   status: 'info',
        //   duration: 10000,
        //   isClosable: false,
        //   position: 'bottom-right',
        // })
      }).subscribe()
    return () => {
      watchForRealtimeChanges && supabase.removeChannel(sub)
    }
  }, [watchForRealtimeChanges])

  return (
    <div className='flex flex-col h-[calc(100%-32px)] w-full'>
      <Header title="My Electric Vehicle" />

      {/* <p className='px-[20px] text-xs'>This is Start Page in which Driver will see a Map and Get an option to Accept or Reject Rides</p> */}
      <div className='flex flex-col text-center flex-1'>
        <div className='my-auto'>
          <p className='px-[20px] text-xs'>This is Start Page in which Driver will see a Map and Get an option to Accept or Reject Rides</p>
          {rides && <p className='pt-[20px] text-lg'>Rides</p>}
          {/* {rides && rides.map((elem) => <p className='text-xs text-left'>{elem.fare + 'Rs ='} {elem.pickup_loc} - {elem.drop_loc}</p>)} */}
          {rides && <ToDos toDos={rides} />}
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