import React from 'react';
import Grid from '@material-ui/core/Grid';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

function chattingUsersAndMessage({location, userId, userMessage, messageTime }) {
    return (
        <>
            <p className={`chat__message ${true && "chat__reciever"}`}>
                <span className="chat__name">{userId}</span>
                    {{userMessage}}
                <span className="chat__timestamp">{messageTime}</span>
            </p>
        </>
    )
}

export default chattingUsersAndMessage
