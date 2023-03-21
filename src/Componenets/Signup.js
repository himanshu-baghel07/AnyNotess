import React, { useContext, useState } from 'react'
import { Link, Navigate, NavLink } from 'react-router-dom';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'

import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Container,
    Form,
    FormGroup,
    Row
} from 'reactstrap';

import {
    Alert,
    Button,
    TextField
} from '@mui/material';

import { UserContext } from '../Context/UserContext';
import { FaSignInAlt } from 'react-icons/fa';

const Signup = () => {

    const context = useContext(UserContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState({ message: '', severity: '' })

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
                if (error.code === 'auth/email-already-in-use') {
                    setAlert({
                        message: 'Email is already taken',
                        severity: 'warning'
                    })
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
        <Container fluid style={{ height: '89vh' }}>
            <Row className='justify-content-center'>
                <Col lg={4} className='offset-lg mt-5' >
                    <Card className='shadow bg-body  rounded'>
                        <Form onSubmit={handleFormSubmit}>
                            <CardHeader style={{ fontSize: '1.5rem' }} className='text-center'>Sign Up</CardHeader>
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
                                <FormGroup className='text-center'>
                                <NavLink tag={Link} to="/" className="fs-5 text-primary" style={{textDecoration:'none'}}>
                                    Go to Sign-In Page
                                </NavLink>
                                </FormGroup>
                                {alert.message && (
                                    <Alert severity={alert.severity} onClose={() => setAlert({ message: '', severity: '' })}>
                                        {alert.message}
                                    </Alert>
                                )}

                               
                            </CardBody>
                            <CardFooter className="text-center mt-3">
                                <Button type='submit' style={{ backgroundColor: 'green' }} variant="contained">Sign Up</Button>
                            </CardFooter>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
export default Signup