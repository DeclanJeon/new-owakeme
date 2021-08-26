import React from 'react';

const DOMAIN_FORMAT = /(http(s)?:\/\/)([a-z0-9\w]+\.*)+[a-z0-9]{2,4}/gi

function chattingUsersAndMessage({location, userId, userMessage }) {
    const regExp = new RegExp(DOMAIN_FORMAT, "i");

    return (
        <>
            <p className={`chat__message ${true && "chat__reciever"}`}>
                <span className="chat__name">{userId}</span>
                    {regExp.test(userMessage.message) ?
                        <a href={userMessage.message}>{userMessage.message}</a>
                        :
                        userMessage.message
                    }
                <span className="chat__timestamp">{userMessage.messageTime}</span>
            </p>
        </>
    )
}

export default React.memo(chattingUsersAndMessage)
