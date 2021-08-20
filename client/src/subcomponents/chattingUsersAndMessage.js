import React from 'react';

function chattingUsersAndMessage({location, userId, userMessage, messageTime }) {
    return (
        <>
            <p className={`chat__message ${true && "chat__reciever"}`}>
                <span className="chat__name">{userId}</span>
                    {userMessage}
                <span className="chat__timestamp">{messageTime}</span>
            </p>
        </>
    )
}

export default React.memo(chattingUsersAndMessage)
