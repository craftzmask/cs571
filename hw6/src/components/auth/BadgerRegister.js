import React, { useContext, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AlertContext from '../../contexts/AlertContext';

export default function BadgerRegister() {
    const { showAlert } = useContext(AlertContext);
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const register = e => {
        e.preventDefault();

        if (!(username && password)) {
            showAlert('You must provide both a username and password!', 'danger');
        } else if (password !== repeatPassword) {
            showAlert('Your passwords do not match!', 'danger');
        } else {
            fetch('https://www.cs571.org/s23/hw6/api/register', {
                method: 'POST',
                headers: {
                    'X-CS571-ID': 'bid_2b48c7a36a98db55355d',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            })
            .then(res => {
                if (res.status === 409) {
                    showAlert('That username has already been taken!', 'danger');
                    throw new Error('That username has already been taken!');
                } else if (res.status === 200) {
                    return res.json();
                }
            })
            .then(data => {
                showAlert('The registration was successful', 'success ');
                navigate('/login');
            })
            .catch(error => console.error(error));
        }
    }

    return <>
        <h1>Register</h1>
        <Form onSubmit={register} >
            <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Repeat Password</Form.Label>
                <Form.Control type="password"
                    value={repeatPassword}
                    onChange={e => setRepeatPassword(e.target.value)}
                />
            </Form.Group>

            <Button type="submit">Register</Button>
        </Form>

    </>
}