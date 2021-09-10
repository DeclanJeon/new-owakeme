import React, { useState } from 'react';
import { Button, CircularProgress } from '@material-ui/core';

const DOMAIN_FORMAT = /(http(s)?:\/\/)([a-z0-9\w]+\.*)+[a-z0-9]{2,4}/gi

function chattingUsersAndMessage({ userId, userMessage, messageTime, track, fileStorage, onDownloadFile, fileLoading }) {
    const regExp = new RegExp(DOMAIN_FORMAT, "i");
    const mediaId = fileStorage.mediaId;
    const fileName = fileStorage.fileName;

    const onDownload = () => {
        onDownloadFile(mediaId, fileName);
    }

    return (
        <>
            <p className={`chat__message ${true && "chat__reciever"}`}>
                {userMessage !== "" ?
                    <>
                        <span className="chat__name">{userId}</span>
                            {regExp.test(userMessage) ?
                                <a href={userMessage}>{userMessage}</a>
                                :
                                userMessage
                            }
                        <span className="chat__timestamp">{messageTime}</span>
                    </>
                    :
                    <>
                        {track == "local" ?
                            <>
                                <span className="chat__name">{userId}</span>
                                {fileStorage.map((obj) => (
                                    <div>
                                            {obj.name}
                                    </div>
                                ))}
                                <div>
                                    upload
                                </div>
                                <span className="chat__timestamp">{messageTime}</span>
                            </>
                            :
                            <>
                                <span className="chat__name">{userId}</span>
                                    {fileStorage.fileName}
                                    {fileLoading && <CircularProgress />}
                                <div>
                                    <Button onClick={onDownload}>다운로드</Button>
                                </div>
                                <span className="chat__timestamp">{messageTime}</span>
                            </>
                        }
                    </>
                }
                
            </p>
        </>
    )
}

export default React.memo(chattingUsersAndMessage)
