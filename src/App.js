import React, { useState } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import Signin from './Componenets/Signin'
import Header from './Componenets/Header'
import './App.css'
import Home from './Componenets/Home'
import Signup from './Componenets/Signup'
import ForgetPassword from './Componenets/ForgetPassword'
import { UserContext } from './Context/UserContext'
import FirebaseConfig from './Componenets/FirebaseConfig'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

import "bootstrap/dist/css/bootstrap.min.css";

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'

firebase.initializeApp(FirebaseConfig)


const App = () => {

  const [user, setUser] = useState({
    email: localStorage.getItem('userEmail'),
  });
  return (
    <div>
      <Router>
        <ToastContainer />
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