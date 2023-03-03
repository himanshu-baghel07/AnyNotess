import React, { useContext, useState, useEffect } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'
import { UserContext } from '../Context/UserContext';
import { toast } from 'react-toastify';


const Signin = () => {

    const context = useContext(UserContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(res => {
                console.log("Response", res)
                context.setUser({ email: res.user?.email, uid: res.user?.uid })
                localStorage.setItem('userEmail', res.user.email);
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
                }
                else {
                    toast("Enter both email and password for Login", { type: "warning" })
                }
            })
    };

    const handleFormSubmit = e => {
        e.preventDefault()
        handleSignIn()
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            handleSignIn()
        }
    }

    const navigate = useNavigate()
    useEffect(() => {
        navigate('/');
        window.onpopstate = (e) => {
            navigate(1);
        };
    }, []);

    if (context.user?.uid) {
        return <Navigate to="/home" />
    }

    return (
        <div className='signin'>
            <div className='leftBar'>
                <div className='signinTab'>
                    <div className='SigninTitle'>
                        Login to You Account
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
                        <button type='submit' onClick={handleFormSubmit}>Login</button>
                    </div>
                    <div>
                        <h2 class='or'>
                            <span>Or</span>
                        </h2>
                    </div>
                    <Link to='/forgetpassword' style={{ textDecoration: "none" }}>
                        <p className='forgetPassword' style={{ textAlign: "center" }}>Forgotten Password?</p>
                    </Link>
                </div>
            </div>
            <div className='rightBar'>
                <div className='rightbarinfo' >
                    <h1 className='banner'>New Here?</h1>
                    <p>SignUp and Create notes anywhere, anytime easily</p>
                    <h2> <a href='/Signup' >Click to Sign up</a></h2>
                </div>
            </div>
        </div>
    )
}
export default Signin