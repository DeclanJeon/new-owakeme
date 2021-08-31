import React from 'react';

const DOMAIN_FORMAT = /(http(s)?:\/\/)([a-z0-9\w]+\.*)+[a-z0-9]{2,4}/gi

function chattingUsersAndMessage({ userId, userMessage, messageTime, track }) {
    const regExp = new RegExp(DOMAIN_FORMAT, "i");

    return (
        <>
            <p className={`chat__message ${true && "chat__reciever"}`}>
                <span className="chat__name">{userId}</span>
                    {regExp.test(userMessage) ?
                        <a href={userMessage}>{userMessage}</a>
                        :
                        userMessage
                    }
                <span className="chat__timestamp">{messageTime}</span>
            </p>
        </>
    )
}

export default React.memo(chattingUsersAndMessage)
