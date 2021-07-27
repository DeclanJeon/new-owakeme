import React from 'react';
import Grid from '@material-ui/core/Grid';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

function chattingUsersAndMessage(props) {
    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <ListItemAvatar align={props.location}>
                        <Avatar>
                            {props.userId}
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText align={props.location}>{props.userMessage}</ListItemText>
                </Grid>
                <Grid item xs={12}>
                    <ListItemText align={props.location} secondary={props.messageTime}></ListItemText>
                </Grid>
            </Grid>
        </>
    )
}

export default chattingUsersAndMessage
