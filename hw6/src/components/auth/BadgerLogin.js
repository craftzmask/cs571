import React, { useContext, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import AlertContext from '../../contexts/AlertContext';

export default function BadgerLogin() {
    const username = useRef();
    const password = useRef();
    const { setUser } = useContext(UserContext);
    const { showAlert } = useContext(AlertContext);
    const navigate = useNavigate();

    const login = e => {
        e.preventDefault();

        if (!(username.current.value && password.current.value)) {
            showAlert("You must provide both a username and password!", 'danger');
        } else {
            fetch('https://www.cs571.org/s23/hw6/api/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'X-CS571-ID': 'bid_2b48c7a36a98db55355d',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username.current.value,
                    password: password.current.value
                })
            })
            .then(res => res.json())
            .then(data => {
                if (!data.user) {
                    throw new Error(data.msg);
                }
                showAlert('Login was successful', 'success');
                setUser(data.user);
                navigate('/');
            })
            .catch(err => showAlert(err.message, 'danger'));
        }
    }

    return <>
        <h1>Login</h1>
        <Form onSubmit={login}>
            <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    ref={username}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    ref={password}
                />
            </Form.Group>

            <Button type="submit">Login</Button>
        </Form>
    </>
}