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
import { FaSignOutAlt } from 'react-icons/fa'

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
                <Navbar id='Navbar' className='header' color='primary' light expand="md" style={{ borderBottom: '1px solid white' }}>
                        <NavbarBrand >
                                <Link to="/" className="me-auto display-6 text-black text-decoration-none " >
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
                                <NavbarText className="mx-auto" style={{  color: 'black', borderRadius: '50px', paddingLeft: '10px', paddingRight: '10px' }}  >
                                        {context.user?.email ? context.user.email : ""}
                                </NavbarText>
                                <Nav className="ms-auto" navbar >
                                        {
                                                context.user?.email ? (
                                                        <>
                                                                <NavItem>
                                                                        <NavLink onClick={handleLogout} className="text-black" style={{ cursor: 'pointer', fontSize: '1.5rem' }}>Sign-Out <FaSignOutAlt /></NavLink>
                                                                </NavItem>
                                                        </>
                                                ) : (
                                                        ''
                                                )
                                        }
                                </Nav>
                        </Collapse>
                </Navbar>
        )
}
export default Header