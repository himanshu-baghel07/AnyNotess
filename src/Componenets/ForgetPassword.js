import React, { useState } from 'react'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'
import { toast } from 'react-toastify'


const ForgetPassword = () => {

    const [email, setEmail] = useState('');
    const [setMessage] = useState('');

    const auth = firebase.auth();

    const sendPasswordResetEmail = (event) => {
        event.preventDefault();
        auth.sendPasswordResetEmail(email).then(() => {
            setMessage('Password reset email sent.');
            toast('Password reset email sent', {
                type: "success"
            })
        }).catch((error) => {
            setMessage(error.message);
            if (error.code === 'auth/invalid-email') {
                toast.error('Invalid email, Please try valid email')
            }
            else if (error.code === 'auth/internal-error') {
                toast.error('Internal error, Please try valid email')
            }
            else {
                toast.error('Email not found, Please try valid email')
            }
        });
    };

    return (
        <div className='signin'>
            <div className='leftBar'>
                <div className='signinTab'>
                    <div className='SigninTitle'>
                        Forget Password
                    </div>
                    <div className='emailTab'>
                        <input
                            className='foregtinput'
                            type='email'
                            placeholder='Email'
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required />
                    </div>
                    <div className='loginButton'>
                        <button className='forgetbtn' type='submit' onClick={sendPasswordResetEmail}>Reset Password</button>
                    </div>
                </div>
            </div>
            <div className='rightBar'>
                <h1 className='banner'>Login</h1>
                <p>Do you Want to go login page</p>
                <a href='/' >Click Here to Login</a>
            </div>
        </div>
    )
}
export default ForgetPassword