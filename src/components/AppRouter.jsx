import React from 'react'
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import AppPage from '../App'
import Homepage from '../pages/HomePage'
import Accountpage from '../pages/AccountPage'
import StartDriving from '../pages/StartPage'
// import NotfoundPage from '../pages/NotfoundPage'
// import Profilepage from '../pages/Profilepage'
// import Registerpage from '../pages/Registerpage'

export default function AppRouter(props) {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<AppPage />} />
          {/* <Route exact path='/home' element={<Homepage />} /> */}
          <Route exact path='/account' element={<Accountpage />} />
          <Route exact path='/start-driver' element={<StartDriving />} />
          {/* <Route exact path='/register' component={Registerpage} /> */}
          {/* <Route exact path='/profile' component={Profilepage} /> */}
          {/* <Route exact path='*' component={NotfoundPage} /> */}
        </Routes>
      </Router>
    </>
  )
}