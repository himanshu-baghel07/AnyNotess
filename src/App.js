// Importing the necessary modules and components
import React, { useState } from "react";
import "./App.css";
import Signin from "./Componenets/Signin";
import Header from "./Componenets/Header";
import Home from "./Componenets/Home";
import Signup from "./Componenets/Signup";
import ForgetPassword from "./Componenets/ForgetPassword";
import { UserContext } from "./Context/UserContext";
import FirebaseConfig from "./Componenets/FirebaseConfig";

// Importing firebase and required modules
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// Importing routing components from react-router-dom
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// Importing bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

// Initialize Firebase with the provided configuration
firebase.initializeApp(FirebaseConfig);

const App = () => {
  // Using useState to manage the user state which contains email data
  const [user, setUser] = useState({
    email: localStorage.getItem("userEmail"),
  });

  return (
    <div>
      <Router>
        {/* Providing the UserContext to all components */}
        <UserContext.Provider value={{ user, setUser }}>
          {/* Including the Header component which may consume the UserContext */}
          <Header />
          <Routes>
            {/* Defining routes for different pages */}
            <Route exact path="/" element={<Signin />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/forgetpassword" element={<ForgetPassword />} />
          </Routes>
        </UserContext.Provider>
      </Router>
    </div>
  );
};
export default App;
