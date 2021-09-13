import React from 'react';
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
            <p className={track === 'local' ? 'chat__receiver' : 'chat__message'}>
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
                                <div className="upload_file">
                                    {fileStorage.map((obj, index) => (
                                        <div key={index}>
                                               {index+1}. {obj.name}
                                        </div>
                                    ))}
                                </div>
                                <div className="uploaded">
                                    uploaded
                                </div>
                                <span className="chat__timestamp">{messageTime}</span>
                            </>
                            :
                            <>
                                <span className="chat__name">{userId}</span>
                                    {fileStorage.fileName}
                                <div className="download__button">
                                    <Button onClick={onDownload}>Download</Button>
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
