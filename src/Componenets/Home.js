import React, { useState, useEffect, useContext } from 'react'
import { NavLink } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa'
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import firebaseConfig from './FirebaseConfig';
import { UserContext } from '../Context/UserContext';

firebase.initializeApp(firebaseConfig);
const database = firebase.database();


const Home = () => {
    const context = useContext(UserContext)
    const [textareaData, setTextareaData] = useState([]);

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
                    setTextareaData(data || []);
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

    const handleTextareaTextChange = (event, index) => {
        const newData = [...textareaData];
        newData[index] = {
            ...newData[index],
            text: event.target.value
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
            return;
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


    const handleDeleteAllTextareaButtonClick = (index) => {
        const newData = [...textareaData]
        newData.splice(index,)
        setTextareaData(newData)

        if (userId) {
            firebase
                .database()
                .ref(`users/${userId}/textareaData`)
                .set(newData)
        }
    }


    const renderTextarea = (data, index) => (
        <div className='noteContainer' key={index}>
            <input
                type='text'
                value={data.title}
                placeholder='Title'
                onChange={(event) => handleTextareaTitleChange(event, index)}
            />
            <br />
            <textarea
                rows="4"
                cols="50"
                placeholder='Text'
                value={data.text}
                onChange={(event) => handleTextareaTextChange(event, index)}
            />
            <button onClick={() => handleDeleteTextareaButtonClick(index)}><FaTrash className='trash' /></button>
        </div>
    );

    return (
        <div className='home'>
            <div className='searchTwo'>
                <div className='searchAndUsername'>
                    <button className='Btn one' onClick={handleAddTextareaButtonClick}>Add Note</button>
                    <button className='Btn two' onClick={handleDeleteAllTextareaButtonClick}>Delete All Notes</button>
                    <h3 >{context.user?.email ? context.user.email : ""}</h3>
                    <NavLink className='navlinked' onClick={() => { context.setUser(null) }} to='/'>Logout</NavLink>
                </div>
                <div className='AddTextarea'>
                    {textareaData.map(renderTextarea)}
                </div>
            </div>
        </div>
    )
}
export default Home