import React from 'react';
import {Link, NavLink} from "react-router-dom";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import logo from '../react-1-logo.svg';
import {BaseURLProvider} from "../contexts/BaseURLContext";
// import '../style.css';

const NavigationBar = () => {
    return (
        <Navbar bg="dark" variant="dark" style={{marginBottom: '13px'}}>
            <div className={'container-fluid'}>
                <Navbar.Brand as={NavLink} to={'/'}>
                    <img
                        alt="logo"
                        src={logo}
                        height={'40px'}
                        width={'40px'}/>
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={NavLink} to={'/'}>Home</Nav.Link>
                    <NavDropdown title="Students" id="basic-nav-dropdown">
                        <BaseURLProvider>
                            <NavDropdown.Item as={Link} to={'/students'}>
                                Manage Students
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to={'/students/id-cards'}>
                                Manage Student Id Cards
                            </NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item as={Link} to={'/students/add'}>
                                Add New Student
                            </NavDropdown.Item>
                        </BaseURLProvider>
                    </NavDropdown>
                    <NavDropdown title="Books" id="basic-nav-dropdown">
                        <BaseURLProvider>
                            <NavDropdown.Item as={Link} to={'/books'}>
                                Manage Books
                            </NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item as={Link} to={'/books/add'}>
                                Add New Book
                            </NavDropdown.Item>
                        </BaseURLProvider>
                    </NavDropdown>
                    <NavDropdown title="Courses" id="basic-nav-dropdown">
                        <BaseURLProvider>
                            <NavDropdown.Item as={Link} to={'/courses'}>
                                Manage Courses
                            </NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item as={Link} to={'/courses/add'}>
                                Add New Course
                            </NavDropdown.Item>
                        </BaseURLProvider>
                    </NavDropdown>
                </Nav>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text style={{paddingRight: '3rem'}}>
                        Hello, <a href="#login">Mark Otto</a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </div>
        </Navbar>
        // <div className={'text-center'}>
        //     <BaseURLProvider>
        //         <div>
        //             <Link to={'/students'} className={"h2 text-decoration-none"}>Manage Students</Link>
        //         </div>
        //         <div>
        //             <Link to={'/students/id-cards'} className={"h2 text-decoration-none"}>Manage Students ID Card</Link>
        //         </div>
        //     </BaseURLProvider>
        //     <div>
        //         <Link to={'/books'} className={"h2 text-decoration-none"}>Manage Books</Link>
        //     </div>
        //     <div>
        //         <Link to={'/courses'} className={"h2 text-decoration-none"}>Manage Courses</Link>
        //     </div>
        // </div>
    );
};

export default NavigationBar;