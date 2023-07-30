import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import {
  Navbar,
  NavbarBrand,
  NavbarText,
  NavbarToggler,
  Nav,
  NavLink,
  NavItem,
  Collapse,
} from "reactstrap";
import { FaSignOutAlt } from "react-icons/fa";

import firebase from "firebase/compat/app";
import "firebase/compat/database";

import BorderColorIcon from "@mui/icons-material/BorderColor";

const Header = () => {
  // Get the user context from the UserContext provider
  const context = useContext(UserContext);

  // State to manage the navbar collapse (for responsive behavior)
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  // Hook to navigate between routes
  const navigate = useNavigate();

  // Function to handle user logout
  const handleLogout = () => {
    firebase.auth().signOut(); // Sign out the user from Firebase
    localStorage.removeItem("user"); // Remove user data from local storage
    context.setUser(null); // Clear user context
    navigate("/"); // Navigate to the home page after logout
  };

  return (
    <Navbar
      id="Navbar"
      className="header"
      color="primary"
      light
      expand="md"
      style={{ borderBottom: "1px solid white" }}
    >
      {/* Brand/logo and navigation toggle button */}
      <NavbarBrand>
        <Link
          to="/"
          className="me-auto display-6 text-black text-decoration-none "
        >
          AnyNotes
          <BorderColorIcon />
        </Link>
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />

      {/* Navigation items */}
      <Collapse
        isOpen={isOpen}
        className="mx-auto"
        style={{
          textAlign: "right",
          fontSize: "1.1rem",
          fontFamily: "cursive",
        }}
        navbar
      >
        {/* Display the user's email */}
        <NavbarText
          className="mx-auto"
          style={{
            color: "black",
            borderRadius: "50px",
            paddingLeft: "10px",
            paddingRight: "10px",
          }}
        >
          {context.user?.email ? context.user.email : ""}
        </NavbarText>

        {/* Navigation links */}
        <Nav className="ms-auto" navbar>
          {context.user?.email ? (
            // If the user is logged in, show the Sign-Out link
            <>
              <NavItem>
                <NavLink
                  onClick={handleLogout}
                  className="text-black"
                  style={{ cursor: "pointer", fontSize: "1.5rem" }}
                >
                  Sign-Out <FaSignOutAlt />
                </NavLink>
              </NavItem>
            </>
          ) : (
            // If the user is not logged in, don't show any navigation links
            ""
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Header;
