import React, { useContext, useEffect, useState, useRef } from "react";
import { Form, Button } from 'react-bootstrap';
import BadgerMessage from './BadgerMessage';
import UserContext from "../../contexts/UserContext";
import AlertContext from '../../contexts/AlertContext';

export default function BadgerChatroom(props) {
    const { user } = useContext(UserContext);
    const { showAlert } = useContext(AlertContext);
    const [messages, setMessages] = useState([]);
    const title = useRef();
    const content = useRef('');

    const loadMessages = () => {
        fetch(`https://cs571.org/s23/hw6/api/chatroom/${props.name}/messages`, {
            headers: {
                "X-CS571-ID": "bid_2b48c7a36a98db55355d",
            }
        }).then(res => res.json()).then(json => {
            setMessages(json.messages);
        })
    };

    useEffect(() => {
        loadMessages();
    }, [props]);

    const post = e => {
        e.preventDefault();

        if (!(title && content)) {
            showAlert("You must provide both a title and content!", 'danger');
        } else {
            fetch(`https://cs571.org/s23/hw6/api/chatroom/${props.name}/messages`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "X-CS571-ID": "bid_2b48c7a36a98db55355d",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: title.current.value,
                    content: content.current.value
                })
            })
            .then(res => {
                if (res.status === 401) {
                    throw new Error("You must be logged in to post!");
                }
                showAlert("Successfully posted!", "success");
                loadMessages();
            })
            .catch(err => showAlert(err.message, 'danger'));

            title.current.value = '';
            content.current.value = '';
        }
    }

    const deletePost = id => {
        fetch(`https://cs571.org/s23/hw6/api/chatroom/${props.name}/messages/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                "X-CS571-ID": "bid_2b48c7a36a98db55355d",
                "Content-Type": "application/json"
            }
        }).then(res => {
            console.log(res)
            showAlert("Successfully deleted the post!", "success")
            loadMessages();
        })
    }

    return <>
        <h1>{props.name} Chatroom</h1>
        {
            user ?
                <Form onSubmit={post}>
                    <Form.Group className="mb-3">
                        <Form.Label>Post Title</Form.Label>
                        <Form.Control
                            type="text"
                            ref={title}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Post Content</Form.Label>
                        <Form.Control
                            type="text"
                            ref={content}
                        />
                    </Form.Group>

                    <Button type="submit">Create Post</Button>
                </Form>
                :
                <p>You must be logged in to post!</p>
        }   
        <hr/>
        {
            messages.length > 0 ?
                <>
                    {
                        messages.map(message => <BadgerMessage key={message.id} {...message} user={user} onClick={deletePost} />)
                    }
                </>
                :
                <>
                    <p>There are no messages in this chatroom yet!</p>
                </>
        }
    </>
}