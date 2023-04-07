import React from 'react'
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Homepage from '../App'
import Loginpage from '../pages/LoginPage'
// import NotfoundPage from '../pages/NotfoundPage'
// import Profilepage from '../pages/Profilepage'
// import Registerpage from '../pages/Registerpage'

export default function AppRouter(props) {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<Homepage />} />
          <Route exact path='/login' element={<Loginpage />} />
          {/* <Route exact path='/register' component={Registerpage} /> */}
          {/* <Route exact path='/profile' component={Profilepage} /> */}
          {/* <Route exact path='*' component={NotfoundPage} /> */}
        </Routes>
      </Router>
    </>
  )
}