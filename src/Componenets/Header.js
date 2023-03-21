import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../Context/UserContext'
import {
        Navbar,
        NavbarBrand,
        NavbarText,
        NavbarToggler,
        Nav,
        NavLink,
        NavItem,
        Collapse
} from 'reactstrap'
import { FaRegAddressBook, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'

import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

import BorderColorIcon from '@mui/icons-material/BorderColor';

const Header = () => {
        const context = useContext(UserContext)
        const [isOpen, setIsOpen] = useState(false);
        const toggle = () => setIsOpen(!isOpen);

        const navigate = useNavigate()
        const handleLogout = () => {
                firebase.auth().signOut();
                localStorage.removeItem('user');
                context.setUser(null);
                navigate('/')
        };

        return (
                <Navbar className='header' color='primary' light expand="md">
                        <NavbarBrand >
                                <Link to="/" className="me-auto display-6 text-white text-decoration-none " >
                                        AnyNotes<BorderColorIcon />
                                </Link>
                        </NavbarBrand>
                        <NavbarToggler onClick={toggle} />
                        <Collapse
                                isOpen={isOpen}
                                className='mx-auto'
                                style={{ textAlign: 'right', fontSize: '1.1rem', fontFamily: 'cursive' }}
                                navbar
                        >
                                <NavbarText className="mx-auto text-white " >
                                        {context.user?.email ? context.user.email : ""}
                                </NavbarText>
                                <Nav className="ms-auto" navbar >
                                        {
                                                context.user?.email ? (
                                                        <>
                                                                <NavItem>
                                                                        <NavLink onClick={handleLogout} className="text-white" style={{ cursor: 'pointer', fontSize: '1.2rem' }}>Sign-Out <FaSignOutAlt /></NavLink>
                                                                </NavItem>
                                                        </>
                                                ) : (
                                                        <>
                                                                {window.location.pathname === "/signup" ?
                                                                        (
                                                                                <NavItem>
                                                                                        <NavLink tag={Link} to="/" className="fs-5 text-white">
                                                                                                Sign-In <FaSignInAlt />
                                                                                        </NavLink>
                                                                                </NavItem>
                                                                        ) : (
                                                                                <NavItem>
                                                                                        <NavLink tag={Link} to="/signup" className="fs-5 text-white">
                                                                                                SignUp <FaRegAddressBook />
                                                                                        </NavLink>
                                                                                </NavItem>
                                                                        )}
                                                        </>
                                                )
                                        }
                                </Nav>
                        </Collapse>
                </Navbar>
        )
}
export default Header