import React from 'react';
import Grid from '@material-ui/core/Grid';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

function chattingUsersAndMessage({location, userId, userMessage, messageTime }) {
    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <ListItemAvatar align={location}>
                        <Avatar>
                            {userId}
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText align={location}>{userMessage}</ListItemText>
                </Grid>
                <Grid item xs={12}>
                    <ListItemText align={location} secondary={messageTime}></ListItemText>
                </Grid>
            </Grid>
        </>
    )
}

export default chattingUsersAndMessage
