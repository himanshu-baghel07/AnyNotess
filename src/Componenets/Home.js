import React, { useState, useEffect } from 'react'

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  Input,
  ModalHeader,
  Row
} from 'reactstrap';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { Alert } from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import firebaseConfig from './FirebaseConfig';

firebase.initializeApp(firebaseConfig);

const Home = () => {
  const [textareaData, setTextareaData] = useState([]);
  const [alert, setAlert] = useState({ message: '', severity: '' })

  const user = firebase.auth().currentUser;
  const userId = user ? user.uid : null;

  useEffect(() => {
    if (userId) {
      firebase
        .database()
        .ref(`users/${userId}/textareaData`)
        .once('value')
        .then((snapshot) => {
          const data = snapshot.val();
          const dataArray = data ? Object.values(data) : [];
          setTextareaData(dataArray);
        });
    }
  }, [userId]);

  useEffect(() => {
    firebase
      .database()
      .ref(`users/${userId}/textareaData`)
      .once('value')
      .then((snapshot) => {
        const data = snapshot.val();
        setTextareaData(data || []);
      });
  }, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log("User", user)
      if (user) {
        localStorage.setItem('userEmail', user.email);
      } else {
        localStorage.removeItem('userEmail');
      }
    });
  }, [])

  const handleTextareaTitleChange = (event, index) => {
    const newData = [...textareaData];
    newData[index] = {
      ...newData[index],
      title: event.target.value
    }
    setTextareaData(newData);

    if (userId) {
      firebase
        .database()
        .ref(`users/${userId}/textareaData`)
        .set(newData);
    }
  }

  const handleTextareaTextChange = (value, index) => {
    const newData = [...textareaData];
    newData[index] = {
      ...newData[index],
      text: value
    }
    setTextareaData(newData);

    if (userId) {
      firebase
        .database()
        .ref(`users/${userId}/textareaData`).set(newData);
    }
  }


  const handleAddTextareaButtonClick = () => {
    const firstTextarea = textareaData[textareaData.length - 1];
    if (firstTextarea && firstTextarea.title === '' && firstTextarea.text === '') {
      return (
        setAlert({
          message: '!Can not create another Note, if previous note is empty',
          severity: 'warning'
        })
      );
    }

    const newData = [...textareaData, { title: '', text: '' }];
    setTextareaData(newData);

    if (userId) {
      firebase
        .database()
        .ref(`users/${userId}/textareaData`)
        .set(newData);
    }
  };

  const handleDeleteTextareaButtonClick = (index) => {
    const newData = [...textareaData]
    newData.splice(index, 1)
    setTextareaData(newData)

    if (userId) {
      firebase
        .database()
        .ref(`users/${userId}/textareaData`)
        .set(newData);
    }
  };


  const renderTextarea = (data, index) => (
    <Card key={index} className='mb-5' >
      <CardHeader>
        <Input
          type='text'
          value={data.title}
          placeholder='Title'
          style={{ fontSize: '1.5rem' }}
          onChange={(event) => handleTextareaTitleChange(event, index)}
        />
      </CardHeader>
      <CardBody className='p-0'>
        <ReactQuill
          theme='snow'
          value={data.text}
          onChange={(value) => handleTextareaTextChange(value, index)}
          modules={{ toolbar: true }}
        />
      </CardBody>
      <CardFooter>
        <Button
          style={{ background: 'none', border: 'none' }}
          onClick={() => handleDeleteTextareaButtonClick(index)}>
          <DeleteForeverIcon className='trash' style={{ color: 'red', fontSize: '2rem' }} />
        </Button>
      </CardFooter>
    </Card>
  );

  const textareaCards = textareaData.map(renderTextarea);

  return (
    <Container fluid id='homeTab'>
      <ModalHeader className='justify-content-center'>
        <Button style={{ background: 'none', border: 'none', marginTop: '1px' }} type='button' onClick={handleAddTextareaButtonClick}><NoteAddIcon style={{ fontSize: '2.5rem', color: 'green' }} /></Button>
      </ModalHeader>
      <ModalHeader className='justify-content-center'>
        {alert.message && (
          <Alert severity={alert.severity} onClose={() => setAlert({ message: '', severity: '' })}>
            {alert.message}
          </Alert>
        )}
      </ModalHeader>
      <Row className='justify-content-center'>
        <Col className='d-flex mt-2  justify-content-evenly flex-wrap'>
          {textareaCards}
        </Col>
      </Row>
    </Container>
  );
}
export default Home