import React, { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { Link } from "react-router-dom";
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

const ForgetPassword = () => {
  // State to manage the email input field
  const [email, setEmail] = useState("");
  // State to show alerts
  const [alert, setAlert] = useState({ message: "", severity: "" });

  // Get the auth instance from Firebase
  const auth = firebase.auth();

  // Function to send a password reset email
  const sendPasswordResetEmail = (event) => {
    event.preventDefault();
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        // Password reset email sent successfully
        setAlert({
          message: "Password reset Email sent",
          severity: "success",
        });
      })
      .catch((error) => {
        // Failed to send password reset email (Invalid email)
        setAlert({
          message: "Invalid Email, Enter correct Email",
          severity: "warning",
        });
      });
  };

  return (
    <Grid
      container
      component="main"
      sx={{ height: { md: "90vh", xs: "100vh" } }}
    >
      <CssBaseline />
      {/* Left grid item with background image */}
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
      {/* Right grid item containing the password recovery form */}
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        id="forgetPassword"
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
            Recover forget password
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={sendPasswordResetEmail}
            sx={{ mt: 1 }}
          >
            {/* Email input field */}
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
              style={{
                backgroundColor: "white",
              }}
            />
            {/* Display the alert message if any */}
            {alert.message && (
              <Alert
                severity={alert.severity}
                onClose={() => setAlert({ message: "", severity: "" })}
              >
                {alert.message}
              </Alert>
            )}
            {/* Button to submit the form and send password reset email */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send link to email
            </Button>
            <Grid container>
              <Grid item xs style={{ textAlign: "center" }}>
                {/* Link to go back to the sign-in page */}
                <Link
                  tag={Link}
                  to="/"
                  variant="body2"
                  style={{ color: "Green", fontSize: "1.2rem" }}
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

export default ForgetPassword;
