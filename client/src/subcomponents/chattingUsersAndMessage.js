import React from 'react';

function chattingUsersAndMessage({location, userId, userMessage }) {
    return (
        <>
            <p className={`chat__message ${true && "chat__reciever"}`}>
                <span className="chat__name">{userId}</span>
                    {userMessage.message}
                <span className="chat__timestamp">{userMessage.messageTime}</span>
            </p>
        </>
    )
}

export default React.memo(chattingUsersAndMessage)
