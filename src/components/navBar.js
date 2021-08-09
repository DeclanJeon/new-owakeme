import React, {useState} from 'react';
import ChannelUserList from '../subcomponents/channelUserList';
import Chatting from '../subcomponents/chatting';
import SettingDevice from '../subcomponents/settingDevice';
import { IonIcon } from '@ionic/react'
import { peopleOutline, chatboxEllipsesOutline, settingsOutline } from 'ionicons/icons';

const NavBar = () => {
    const [selectNavBar, setSelectNavBar] = useState('')

    return (
        <div className="row_nav_container">
            <div className="navigaitner">
                <div id="connect_user_list">
                    <IonIcon icon={peopleOutline} onClick={() => setSelectNavBar('List')} />
                </div>
                <div id="chat">
                    <IonIcon icon={chatboxEllipsesOutline} onClick={() => setSelectNavBar('Chat')} />
                </div>
                <div id="setting">
                    <IonIcon icon={settingsOutline} onClick={() => setSelectNavBar('Setting')} />
                </div>
            </div>
            
            {selectNavBar === 'List' ? <ChannelUserList /> : <></>}
                
            {selectNavBar === 'Chat' ? <Chatting /> : <></>}

            {selectNavBar === 'Setting' ? <SettingDevice /> : <></>}
        </div>
    )
}

export default React.memo(NavBar)
