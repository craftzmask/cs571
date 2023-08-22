import React from "react"
import { Button } from "react-bootstrap";

function BadgerMessage(props) {
    const dt = new Date(props.created);

    return <>
        <h2>{props.title}</h2>
        <sub>Posted on {dt.toLocaleDateString()} at {dt.toLocaleTimeString()}</sub>
        <br/><br/>
        <i>{props.poster}</i>
        <p>{props.content}</p>
        {
            props.user && props.user.username === props.poster ?
                <Button variant="danger" onClick={() => props.onClick(props.id)}>Delete Post</Button>
                :
                null
        }
    </>
}

export default BadgerMessage;