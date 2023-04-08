import React, { createContext, useContext, useState, useEffect } from 'react'

import { useAuth } from './AuthContext'
import AppPage from '../App'
import Homepage from '../pages/HomePage'
import Accountpage from '../pages/AccountPage'
import StartDriving from '../pages/StartPage'
// import NotfoundPage from '../pages/NotfoundPage'
// import Profilepage from '../pages/Profilepage'
// import Registerpage from '../pages/Registerpage'

const RouterContext = createContext({
  location: null,
})

export const useCustomRouter = () => useContext(RouterContext)

// export default function AppRouter(props) {
export default function RouterContextProvider({ children }) {
  // return (
  //   <>
  //     <Router>
  //       <Routes>
  //         <Route exact path='/' element={<AppPage />} />
  //         {/* <Route exact path='/home' element={<Homepage />} /> */}
  //         <Route exact path='/account' element={<Accountpage />} />
  //         <Route exact path='/start-driver' element={<StartDriving />} />
  //         {/* <Route exact path='/register' component={Registerpage} /> */}
  //         {/* <Route exact path='/profile' component={Profilepage} /> */}
  //         {/* <Route exact path='*' component={NotfoundPage} /> */}
  //       </Routes>
  //     </Router>
  //   </>
  // )

  const [location, setLocation] = useState('/')

  const navigate = (location) => {
    setLocation(location)
  }

  const Route = (props) => {
    const Path = props.path
    const Element = props.element
    if (Path == location) {return (Element)}
    else {return (<div></div>)}
  }

  const value = {
    location,
    navigate,
  }

  // return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
  return (
    <RouterContext.Provider value={value}>
      {
        <>
          <Route exact path='/' element={<AppPage />} />
          <Route exact path='/account' element={<Accountpage />} />
          <Route exact path='/start-driver' element={<StartDriving />} />
        </>
      }
    </RouterContext.Provider>
  )


  // return (
  //   <>
  //     <Route exact path='/' element={<AppPage />} />
  //     <Route exact path='/account' element={<Accountpage />} />
  //     <Route exact path='/start-driver' element={<StartDriving />} />
  //   </>
  // )
}