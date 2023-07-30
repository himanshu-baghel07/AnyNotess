import React, { useContext, useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import { UserContext } from "../Context/UserContext";

import {
  Alert,
  Avatar,
  Box,
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Paper from "@mui/material/Paper";

const Signin = () => {
  // Get the user context from the UserContext provider
  const context = useContext(UserContext);

  // State to manage user's email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // State to show alerts
  const [alert, setAlert] = useState({ message: "", severity: "" });

  // Function to handle user sign-in with email and password
  const handleSignIn = () => {
    // Sign in with email and password using Firebase authentication
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log("Response", res);
        // Update the user context with user data
        context.setUser({ email: res.user?.email, uid: res.user?.uid });
        localStorage.setItem("userEmail", res.user.email);
        setAlert({
          message: "Successfully login...",
          severity: "success",
        });
      })
      .catch((error) => {
        console.log(error);
        // Handle different authentication errors and show appropriate alerts
        if (email !== "" && password !== "") {
          if (error.code === "auth/wrong-password") {
            setAlert({
              message: "Wrong Password, Enter correct password",
              severity: "error",
            });
          } else if (error.code === "auth/user-not-found") {
            setAlert({
              message: "Email not found",
              severity: "warning",
            });
          } else if (error.code === "auth/invalid-email") {
            setAlert({
              message: "Invalid Email,Please try again",
              severity: "error",
            });
          }
        }
      });
  };

  // Function to handle user sign-in with Google
  const handleSignInWithGoogle = () => {
    // Create a new GoogleAuthProvider
    const provider = new firebase.auth.GoogleAuthProvider();
    // Sign in with Google using Firebase authentication
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        console.log("Response", res);
        // Update the user context with user data
        context.setUser({ email: res.user?.email, uid: res.user?.uid });
        localStorage.setItem("userEmail", res.user.email);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Function to handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSignIn();
  };

  // Function to handle keydown event (Enter key) for sign-in
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSignIn();
    }
  };

  // Get the navigate function from react-router-dom to navigate between routes
  const navigate = useNavigate();
  // Effect to automatically navigate to home page if user is already logged in
  useEffect(() => {
    navigate("/");
    window.onpopstate = (e) => {
      navigate(1);
    };
  }, [navigate]);

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
        id="signInTab"
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
            Sign in
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
              type="email"
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
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
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                {/* Link to forgot password page */}
                <Link tag={Link} to="/forgetpassword" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                {/* Link to sign-up page */}
                <Link tag={Link} to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
          {/* Button to sign-in with Google */}
          <Button
            type="submit"
            onClick={handleSignInWithGoogle}
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: "white",
              color: "blue",
              "&:hover": { backgroundColor: "grey", color: "white" },
            }}
          >
            Sign In with Google
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Signin;
