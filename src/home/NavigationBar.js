import React from 'react';
import {Link} from "react-router-dom";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
// import '../style.css';

const NavigationBar = () => {
    return (
        <Navbar bg="dark" variant="dark" style={{marginBottom: '13px'}}>
            <div className={'container-fluid'}>
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <NavDropdown title="Student" id="basic-nav-dropdown">
                        <NavDropdown.Item>
                            <Link to={'/students'} style={{textDecoration: 'none', color: '#212529'}}>Manage Students</Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                            <Link to={'/students/id-cards'} style={{textDecoration: 'none', color: '#212529'}}>Manage Student Id Cards</Link>
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item>
                            <Link to={'/students/add'} style={{textDecoration: 'none', color: '#212529'}}>Add New Student</Link>
                        </NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text style={{paddingRight: '3rem'}}>
                        Signed in as: <a href="#login">Mark Otto</a>
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