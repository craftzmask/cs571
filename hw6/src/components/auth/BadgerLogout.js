import React, { useContext, useEffect } from 'react';
import UserContext from '../../contexts/UserContext';
import AlertContext from '../../contexts/AlertContext';

export default function BadgerLogout() {
    const { setUser } = useContext(UserContext);
    const { showAlert } = useContext(AlertContext);
    
    useEffect(() => {
        fetch('https://cs571.org/s23/hw6/api/logout', {
            method: 'POST',
            headers: {
                "X-CS571-ID": "bid_2b48c7a36a98db55355d",
                'Content-Type': 'application/json',
            },
            credentials: "include"
        }).then(res => res.json()).then(json => {
            showAlert(json.msg, 'success');
            setUser(null);
        })
    }, [setUser, showAlert]);

    return <>
        <h1>Logout</h1>
        <p>You have been successfully logged out.</p>
    </>
}