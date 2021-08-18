import React from 'react'
import { useSelector } from 'react-redux'
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';

function ChannelUserList() {
    const userNameList = useSelector(state => state.userReducer.userNameList);
    
    return (
        <>
            {userNameList.map((userName, index) => {
                return (
                        <div  kye={index}>
                            <ListItemAvatar align="left">
                                <Avatar>
                                    {userName}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText align="left">{userName}</ListItemText>
                        </div>
                    )
                })}
        </>
    )
}

export default ChannelUserList
