import React, { useState } from 'react'

import './App.css'
import Signin from './Componenets/Signin'
import Header from './Componenets/Header'
import Home from './Componenets/Home'
import Signup from './Componenets/Signup'
import ForgetPassword from './Componenets/ForgetPassword'
import { UserContext } from './Context/UserContext'

import FirebaseConfig from './Componenets/FirebaseConfig'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import "bootstrap/dist/css/bootstrap.min.css";

firebase.initializeApp(FirebaseConfig)

const App = () => {

  const [user, setUser] = useState({
    email: localStorage.getItem('userEmail'),
  });
  return (
    <div>
      <Router>
        <UserContext.Provider value={{ user, setUser }}>
          <Header />
          <Routes>
            <Route exact path='/' element={<Signin />} />
            <Route exact path='/home' element={<Home />} />
            <Route exact path='/signup' element={<Signup />} />
            <Route exact path='/forgetpassword' element={<ForgetPassword />} />
          </Routes>
        </UserContext.Provider>
      </Router>
    </div>
  )
}
export default App