import React, { useMemo, useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Fab from '@material-ui/core/Fab';
import RTMClient from '../rtm-client';
import ChattingUsersAndMessage from './chattingUsersAndMessage';
import Dropzone from 'react-dropzone'
import { saveAs } from 'file-saver'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '30vw',
    height: '100%'
  },
  headBG: {
      backgroundColor: '#e0e0e0'
  },
  borderRight500: {
      borderRight: '1px solid #e0e0e0'
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto'
  }
});

const IMAGE_FORMAT = "\\.(bmp|gif|jpg|jpeg|png)$";

const Chatting = () => {
  const classes = useStyles();
  const [chattingMessage, setChattingMessage] = useState('')
  const [messageStorage, setMessageStorage] = useState([]);
  const [userStorage, setUserStorage] = useState([]);
  const [location, setLocation] = useState([]);

  const [filePath, setFilePath] = useState('')
  

  const channelName = useSelector(state => state.channelReducer.channelName)
  const userName = useSelector(state => state.userReducer.userName)

  const localClient = useMemo(() => {
    const client = new RTMClient();
    return client
  }, [])

  useEffect(() => {
    localClient.init(process.env.REACT_APP_AGORA_APP_ID);
    localClient.login(userName, "", channelName);
  }, [localClient])

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map((files) => {
       if(new RegExp(IMAGE_FORMAT, "i").test(files.name)){
            localClient.sendChannelImageMediaMessage(files, channelName, files).then(() => {
                alert('이미지 업로드 완료')
            });
       } else {
            localClient.sendChannelFileMediaMessage(files, channelName, files).then(() => {
                alert('파일 업로드 완료')
            });
       }
    })
  }, []);

  const onDropRejected = useCallback((error) => {
    alert(error[0].errors[0].code)
  }, []);
  
  const onSendMessage = useCallback((e) => {
    localClient.sendChannelMessage(chattingMessage, channelName).then(() => {
        setChattingMessage('')
        setLocation([...location, "right"])

        setMessageStorage([...messageStorage, chattingMessage]);
        setUserStorage([...userStorage, userName]);
    })
  }, [chattingMessage])

  const onChattingMessage = useCallback((e) => {
      e.preventDefault();

      setChattingMessage(e.currentTarget.value)
  }, [chattingMessage])

  localClient.on('ConnectionStateChanged', (newState, reason) => {
      
  })

  localClient.on('MessageFromPeer', async (message, peerId) => {
      
  })

  localClient.on('MemberJoined', ({ channelName, args }) => {
      
  })

  localClient.on('MemberLeft', ({ channelName, args }) => {
      
  })

  localClient.on('ChannelMessage', async ({ channelName, args }) => {
      const message = args[0].text;
      const messageType = args[0].messageType;
      const mediaId = args[0].mediaId;
      const fileName = args[0].fileName;
      const user = args[1];
      
      switch (messageType) {
        case 'IMAGE':
            localClient.downloadChannelMedia(mediaId).then((r) => {
                debugger;
                //const reader = new FileReader();
                //reader.readAsDataURL(r);
                //reader.onload = function(e) {
                //    setFilePath(e.target.result)
                //}
                saveAs(r, fileName)
            })
        break;
        case 'FILE':
            localClient.downloadChannelMedia(mediaId).then((r) => {
                saveAs(r, fileName)
            })
        break;
        default:  
            setLocation([...location, "left"])
            setMessageStorage([...messageStorage, message]);
            setUserStorage([...userStorage, user]);
        break;
      }
      
  })

  return (
      <>
        <Grid container component={Paper} className={classes.chatSection}>
            <Grid item xs={12}>
                <List className={classes.messageArea}>
                    <Dropzone
                        onDrop={onDrop}
                        maxSize={32000000}
                        onDropRejected={onDropRejected}
                    >
                        {({getRootProps}) => (
                            <div {...getRootProps()} className={classes.messageArea}>
                                {messageStorage.length ?
                                    messageStorage.map((message, index) => 
                                        (
                                            <ListItem key={index}>
                                                <ChattingUsersAndMessage location={location[index]} userId={userStorage[index]} userMessage={message} messageTime="09:30" />
                                            </ListItem>
                                        )
                                    )
                                :
                                    <></>
                                }
        
                                {filePath ? <img src={filePath} /> : <></>}
                            </div>
                        )}
                    </Dropzone>
                </List>
                <Divider />
                <Grid container>
                    <Grid item xs={11}>
                        <TextField label="Type Something" fullWidth onChange={onChattingMessage} value={chattingMessage} />
                    </Grid>
                    <Grid xs={1} align="right">
                        <Fab color="primary" aria-label="add" onClick={onSendMessage}>Send</Fab>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
      </>
  );
}

export default React.memo(Chatting);