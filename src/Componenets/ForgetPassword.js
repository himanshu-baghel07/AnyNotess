import React, { useState } from 'react'

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'

import { Link, NavLink } from 'react-router-dom';
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
import { Alert, Button, TextField } from '@mui/material';

const ForgetPassword = () => {

    const [email, setEmail] = useState('');
    const [alert, setAlert] = useState({ message: '', severity: '' })

    const auth = firebase.auth();

    const sendPasswordResetEmail = (event) => {
        event.preventDefault();
        auth.sendPasswordResetEmail(email).then(() => {
            setAlert({
                message: 'Password reset Email sent',
                severity: 'success'
            })
        }).catch((error) => {
            setAlert({
                message: 'Invalid Email, Enter correct Email',
                severity: 'warning'
            })
        });
    };

    return (
        <Container fluid style={{ height: '89vh' }}>
            <Row className='justify-content-center'>
                <Col lg={4} className='offset-lg mt-5' >
                    <Card className='shadow bg-body  rounded'>
                        <Form onSubmit={sendPasswordResetEmail}>
                            <CardHeader className='text-center h5'>Recover Password</CardHeader>
                            <CardBody>
                                <FormGroup>
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
                                <FormGroup className='text-center'>
                                    <Button type='submit' variant="contained">Reset Password</Button>
                                </FormGroup>
                                {alert.message && (
                                    <Alert severity={alert.severity} onClose={() => setAlert({ message: '', severity: '' })}>
                                        {alert.message}
                                    </Alert>
                                )}
                            </CardBody>
                            <CardFooter className="text-center mt-3">
                                <NavLink tag={Link}
                                    to="/"
                                    className="fs-5 text-success"
                                    style={{ textDecoration: 'none' }}>Go to Login Page</NavLink>
                            </CardFooter>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
export default ForgetPassword