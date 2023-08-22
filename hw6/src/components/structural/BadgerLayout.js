import React, { useContext } from "react";
import { Alert, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import crest from '../../assets/uw-crest.svg';
import UserContext from "../../contexts/UserContext";
import AlertContext from "../../contexts/AlertContext";

function BadgerLayout(props) {
    const { user } = useContext(UserContext);
    const { alerted, alertMessage, alertStatus, closeAlert } = useContext(AlertContext);

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img
                            alt="BadgerChat Logo"
                            src={crest}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        BadgerChat
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        {
                            user ?
                                <Nav.Link as={Link} to="logout">Logout</Nav.Link>
                                :
                                <>
                                    <Nav.Link as={Link} to="login">Login</Nav.Link>
                                    <Nav.Link as={Link} to="register">Register</Nav.Link>
                                </>
                        }
                        <NavDropdown title="Chatrooms">
                            {
                               props
                                .chatrooms
                                .map(chatroom => (
                                    <NavDropdown.Item as={Link} to={`chatrooms/${chatroom}`} key={chatroom}>
                                        {chatroom}
                                    </NavDropdown.Item>
                                ))
                            }
                        </NavDropdown>

                    </Nav>
                </Container>
            </Navbar>
            <div className="body-spacer">
                {   
                    alerted ? 
                        <Alert variant={alertStatus} onClose={closeAlert} dismissible >
                            {alertMessage}
                        </Alert> 
                        :
                        null
                }
                <Outlet />
            </div>
        </div>
    );
}

export default BadgerLayout;