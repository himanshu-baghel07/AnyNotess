import React, { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'

import { UserContext } from '../Context/UserContext';

import { toast } from 'react-toastify'


const Signup = () => {

    const context = useContext(UserContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = () => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(res => {
                console.log("Response", res)
                context.setUser({ email: res.user?.email, uid: res.user?.uid })
            })
            .catch(error => {
                console.log(error);

                if (email !== '' && password !== '') {
                    if (error.code === 'auth/wrong-password') {
                        toast.error('Incorrect password. Please try again.');
                    }
                    else if (error.code === 'auth/invalid-email') {
                        toast.error('Invalid email, Please try valid email')
                    }
                    else if (error.code === 'auth/internal-error') {
                        toast.error('Invalid email, Please try valid email')
                    }
                    else if (error.code === 'auth/email-already-in-use') {
                        toast.error("Emial is already taken")
                    }
                }
                else {
                    toast("Enter both email and password for Signup", { type: "warning" })
                }
            })
    };
    const handleFormSubmit = e => {
        e.preventDefault()
        handleSignUp()
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            handleSignUp()
        }
    }

    if (context.user?.uid) {
        return <Navigate to="/home" />
    }

    return (
        <div className='signin'>
            <div className='leftBar'>
                <div className='signinTab'>
                    <div className='SigninTitle'>
                        Sign up Here
                    </div>
                    <div className='emailTab'>
                        <input
                            type='email'
                            placeholder='Email'
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required />
                    </div>
                    <div className='passwordTab'>
                        <input
                            type='password'
                            placeholder='Password'
                            id="password"
                            value={password}
                            onKeyDown={handleKeyDown}
                            onChange={(e) => setPassword(e.target.value)}
                            required />
                    </div>
                    <div className='loginButton'>
                        <button type='submit' onClick={handleFormSubmit}>Sign up</button>
                    </div>
                </div>
            </div>
            <div className='rightBar'>
                <h1 className='banner'>Old Forks?</h1>
                <p>If you are Existing User then go for login page</p>
                <a href='/' >Click Here to Login</a>
            </div>
        </div>
    )
}
export default Signup