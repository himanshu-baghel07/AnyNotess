import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import {
  Alert,
  Avatar,
  Box,
  Button,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Paper from "@mui/material/Paper";

import { UserContext } from "../Context/UserContext";

const Signup = () => {
  // Get the user context from the UserContext provider
  const context = useContext(UserContext);

  // State to manage user's email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State to show alerts
  const [alert, setAlert] = useState({ message: "", severity: "" });

  // Function to handle user sign-up with email and password
  const handleSignUp = () => {
    // Create a new user with email and password using Firebase authentication
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        console.log("Response", res);
        // Update the user context with user data
        context.setUser({ email: res.user?.email, uid: res.user?.uid });
      })
      .catch((error) => {
        console.log(error);
        // Handle the case when the email is already in use and show a warning alert
        if (error.code === "auth/email-already-in-use") {
          setAlert({
            message: "Email is already taken",
            severity: "warning",
          });
        }
      });
  };

  // Function to handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSignUp();
  };

  // Function to handle keydown event (Enter key) for sign-up
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSignUp();
    }
  };

  // Check if user is already logged in, and redirect to the home page
  if (context.user?.uid) {
    return <Navigate to="/home" />;
  }

  return (
    <Grid
      container
      component="main"
      sx={{ height: { md: "90vh", xs: "100vh" } }}
    >
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            "url(https://source.unsplash.com/featured?technology)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        id="signUpTab"
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleFormSubmit}
            sx={{ mt: 1 }}
          >
            {/* Input fields for email and password */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onKeyDown={handleKeyDown}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* Show alert message if any */}
            {alert.message && (
              <Alert
                severity={alert.severity}
                onClose={() => setAlert({ message: "", severity: "" })}
              >
                {alert.message}
              </Alert>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs style={{ textAlign: "center" }}>
                {/* Link to sign-in page */}
                <Link
                  tag={Link}
                  to="/"
                  variant="body2"
                  style={{ color: "red" }}
                >
                  {"Go to Sign-In page"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Signup;
