import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import axios from 'axios';

function ChannelUserList() {
    const [userNameList, setUserNameList] = useState([]);
    const channelName = useSelector(state => state.channelReducer.channelName);
    const { googleLogin, googleLogOut, isLogin, isLogout } = useSelector(state => state.userReducer);

    useEffect(() => {
        const param = {
            channelName: channelName
        }
        
        axios.post('/api/get/roomUserName', param).then((res) => {
            if(res.data.success === true){
                setUserNameList(res.data.userList);
            }else{
                alert(res.data.err);
            }
        })
    }, [{ googleLogin, googleLogOut, isLogin, isLogout }])
    
    return (
        <>
            {userNameList.map((userName, index) => {
                return (
                        <div key={index}>
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
