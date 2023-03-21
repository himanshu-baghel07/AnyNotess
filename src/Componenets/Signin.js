import React, { useContext, useState, useEffect } from 'react'
import {
    Link,
    Navigate,
    NavLink,
    useNavigate
} from 'react-router-dom';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'

import { UserContext } from '../Context/UserContext';

import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Container,
    Form,
    FormGroup,
    FormText,
    Row
} from 'reactstrap';

import google from '../google.png'

import { Alert, Button, TextField } from '@mui/material';

const Signin = () => {

    const context = useContext(UserContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState({ message: '', severity: '' })

    const handleSignIn = () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(res => {
                console.log("Response", res)
                context.setUser({ email: res.user?.email, uid: res.user?.uid })
                localStorage.setItem('userEmail', res.user.email);
                setAlert({
                    message: 'Successfully login...',
                    severity: 'success'
                })
            })
            .catch(error => {
                console.log(error);
                if (email !== '' && password !== '') {
                    if (error.code === 'auth/wrong-password') {
                        setAlert({
                            message: 'Wrong Password, Enter correct password',
                            severity: 'error'
                        })
                    }
                    else if (error.code === 'auth/user-not-found') {
                        setAlert({
                            message: 'Email not found',
                            severity: 'warning'
                        });
                    }
                }
            })
    };

    const handleSignInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase
            .auth()
            .signInWithPopup(provider)
            .then((res) => {
                console.log("Response", res);
                context.setUser({ email: res.user?.email, uid: res.user?.uid });
                localStorage.setItem("userEmail", res.user.email);
            })
            .catch((error) => {
                console.log(error);
            });
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
        <Container fluid style={{ height: '89vh' }}>
            <Row className='justify-content-center'>
                <Col lg={4} className='offset-lg mt-5' >
                    <Card className='shadow bg-body  rounded'
                        style={{
                            backgroundColor: ' #ffff',
                            opacity: 0.8,
                            backgroundImage: ' radial-gradient(#444cf7 0.5px, transparent 0.5px), radial-gradient(#444cf7 0.5px, #ffff 0.5px)',
                            backgroundSize: '20px 20px',
                            backgroundPosition: '0 0,10px 10px'
                        }}
                    >
                        <Form >
                            <CardHeader className='text-center h5'>Sign-In Here</CardHeader>
                            <CardBody>
                                <FormGroup >
                                    <TextField
                                        id="outlined-basic"
                                        label="Email"
                                        type='email'
                                        variant="outlined"
                                        fullWidth={true}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <TextField
                                        id="outlined-basic"
                                        label="Password"
                                        type='password'
                                        variant="outlined"
                                        fullWidth={true}
                                        value={password}
                                        onKeyDown={handleKeyDown}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup className='d-flex justify-content-between' >
                                    <NavLink
                                        tag={Link}
                                        to="/forgetpassword"
                                        style={{ fontSize: '1rem', textDecoration: 'none' }}
                                        className="fs-7 text-primary">
                                        Forget Password
                                    </NavLink>
                                    <NavLink
                                        tag={Link}
                                        to="/signup"
                                        style={{ fontSize: '1rem', textDecoration: 'none', wordWrap: 'break-word' }}
                                        className="far me-1 ">
                                        Create an account
                                    </NavLink>
                                </FormGroup>
                                {alert.message && (
                                    <Alert severity={alert.severity} onClose={() => setAlert({ message: '', severity: '' })}>
                                        {alert.message}
                                    </Alert>
                                )}
                                <FormGroup className='text-center'>
                                    <Button onClick={handleFormSubmit} variant="contained">Sign-In</Button>
                                </FormGroup>
                                <FormGroup className='h5 text-center'>
                                    <FormText>Or</FormText>
                                </FormGroup>
                                <FormGroup className='text-center'>
                                    <img src={google} onClick={handleSignInWithGoogle} style={{ cursor: 'pointer' }} alt='googleimage' />
                                </FormGroup>
                            </CardBody>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
export default Signin