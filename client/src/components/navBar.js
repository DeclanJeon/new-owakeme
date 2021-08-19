import React, {useState} from 'react';
import ChannelUserList from '../subcomponents/channelUserList';
import Chatting from '../subcomponents/chatting';
import SettingDevice from '../subcomponents/settingDevice';
import { IonIcon } from '@ionic/react'
import { peopleOutline, chatboxEllipsesOutline, settingsOutline } from 'ionicons/icons';

const NavBar = () => {
    const [userList, setUserList] = useState(false)
    const [chat, setChat] = useState(false)
    const [setting, setSetting] = useState(false)

    return (
        <div className="row_nav_container">
            <div className="navigaitner">
                <div id="connect_user_list">
                    <IonIcon icon={peopleOutline} onClick={() => {setUserList(!userList); setChat(false); setSetting(false)}} />
                </div>
                <div id="chat">
                    <IonIcon icon={chatboxEllipsesOutline} onClick={() => {setChat(!chat); setUserList(false); setSetting(false)}} />
                </div>
                <div id="setting">
                    <IonIcon icon={settingsOutline} onClick={() => {setSetting(!setting); setUserList(false); setChat(false)}} />
                </div>
            </div>
            
            {userList ? <ChannelUserList /> : <></>}
                
            {chat ? <Chatting /> : <></>}

            {setting ? <SettingDevice /> : <></>}
        </div>
    )
}

export default React.memo(NavBar)
