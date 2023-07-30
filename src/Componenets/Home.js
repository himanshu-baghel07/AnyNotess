import React, { useState, useEffect } from "react";
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
  Row,
} from "reactstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Alert } from "@mui/material";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import firebaseConfig from "./FirebaseConfig";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const Home = () => {
  // State to manage the textarea data (title and text)
  const [textareaData, setTextareaData] = useState([]);
  // State to show alerts
  const [alert, setAlert] = useState({ message: "", severity: "" });

  // Get the current user and user ID
  const user = firebase.auth().currentUser;
  const userId = user ? user.uid : null;

  // Fetch textarea data from Firebase database on component mount
  useEffect(() => {
    if (userId) {
      firebase
        .database()
        .ref(`users/${userId}/textareaData`)
        .once("value")
        .then((snapshot) => {
          const data = snapshot.val();
          const dataArray = data ? Object.values(data) : [];
          setTextareaData(dataArray);
        });
    }
  }, [userId]);

  // Fetch textarea data from Firebase database on component mount
  useEffect(() => {
    firebase
      .database()
      .ref(`users/${userId}/textareaData`)
      .once("value")
      .then((snapshot) => {
        const data = snapshot.val();
        setTextareaData(data || []);
      });
  });

  // Update local storage with the user's email on authentication change
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        localStorage.setItem("userEmail", user.email);
      } else {
        localStorage.removeItem("userEmail");
      }
    });
  }, []);

  // Function to handle changes to textarea title
  const handleTextareaTitleChange = (event, index) => {
    const newData = [...textareaData];
    newData[index] = {
      ...newData[index],
      title: event.target.value,
    };
    setTextareaData(newData);

    // Update textarea data in Firebase database
    if (userId) {
      firebase.database().ref(`users/${userId}/textareaData`).set(newData);
    }
  };

  // Function to handle changes to textarea text
  const handleTextareaTextChange = (value, index) => {
    const newData = [...textareaData];
    newData[index] = {
      ...newData[index],
      text: value,
    };
    setTextareaData(newData);

    // Update textarea data in Firebase database
    if (userId) {
      firebase.database().ref(`users/${userId}/textareaData`).set(newData);
    }
  };

  // Function to handle adding a new textarea
  const handleAddTextareaButtonClick = () => {
    const firstTextarea = textareaData[textareaData.length - 1];
    if (
      firstTextarea &&
      firstTextarea.title === "" &&
      firstTextarea.text === ""
    ) {
      return setAlert({
        message: "!Can not create another Note, if previous note is empty",
        severity: "warning",
      });
    }

    const newData = [...textareaData, { title: "", text: "" }];
    setTextareaData(newData);

    // Update textarea data in Firebase database
    if (userId) {
      firebase.database().ref(`users/${userId}/textareaData`).set(newData);
    }
  };

  // Function to handle deleting a textarea
  const handleDeleteTextareaButtonClick = (index) => {
    const newData = [...textareaData];
    newData.splice(index, 1);
    setTextareaData(newData);

    // Update textarea data in Firebase database
    if (userId) {
      firebase.database().ref(`users/${userId}/textareaData`).set(newData);
    }
  };

  // Function to render each textarea card
  const renderTextarea = (data, index) => (
    <Card key={index} className="mb-5">
      <CardHeader>
        <Input
          type="text"
          value={data.title}
          placeholder="Title"
          style={{ fontSize: "1.5rem" }}
          onChange={(event) => handleTextareaTitleChange(event, index)}
        />
      </CardHeader>
      <CardBody className="p-0">
        <ReactQuill
          theme="snow"
          value={data.text}
          onChange={(value) => handleTextareaTextChange(value, index)}
          modules={{ toolbar: true }}
        />
      </CardBody>
      <CardFooter>
        <Button
          style={{ background: "none", border: "none" }}
          onClick={() => handleDeleteTextareaButtonClick(index)}
        >
          <DeleteForeverIcon
            className="trash"
            style={{ color: "red", fontSize: "2rem" }}
          />
        </Button>
      </CardFooter>
    </Card>
  );

  // Map textareaData to render each textarea card
  const textareaCards = textareaData.map(renderTextarea);

  return (
    <Container fluid id="homeTab">
      <ModalHeader className="justify-content-center">
        {/* Button to add a new textarea */}
        <Button
          style={{ background: "none", border: "none", marginTop: "1px" }}
          type="button"
          onClick={handleAddTextareaButtonClick}
        >
          <NoteAddIcon style={{ fontSize: "2.5rem", color: "green" }} />
        </Button>
      </ModalHeader>
      <ModalHeader className="justify-content-center">
        {/* Display the alert message if any */}
        {alert.message && (
          <Alert
            severity={alert.severity}
            onClose={() => setAlert({ message: "", severity: "" })}
          >
            {alert.message}
          </Alert>
        )}
      </ModalHeader>
      <Row className="justify-content-center">
        <Col className="d-flex mt-2 justify-content-evenly flex-wrap">
          {/* Render all textarea cards */}
          {textareaCards}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
