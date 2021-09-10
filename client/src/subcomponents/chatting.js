import React, { useMemo, useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Modal from '@material-ui/core/Modal';
import RTMClient from '../rtm-client';
import ChattingUsersAndMessage from './chattingUsersAndMessage';
import Dropzone from 'react-dropzone';
import { saveAs } from 'file-saver';
import "../assets/css/chat.css";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import moment from 'moment';
import { ChannelChatting } from '../reducer/actions/chatting';

const useStyles = makeStyles((theme) => ({
  messageArea: {
    height: '70vh',
    overflowY: 'auto'
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

const IMAGE_FORMAT = "\\.(bmp|gif|jpg|jpeg|png)$";

const Chatting = () => {
  const classes = useStyles();

  const [chattingMessage, setChattingMessage] = useState("");
  const [filesStorage, setFilesStorage] = useState([]);
  const [open, setOpen] = useState(false);
  const [isFileLoading, setIsFileLoading] = useState(false);

  const channelName = useSelector((state) => state.channelReducer.channelName);
  const userName = useSelector((state) => state.userReducer.userName);
  const { userNames, messages, messageTimes, tracks, fileStorage } = useSelector((state) => state.chattingReducer.messageStore);
  const dispatch = useDispatch();

  const localClient = useMemo(() => {
    const client = new RTMClient();
    return client;
  }, []);

  useEffect(() => {
    localClient.init(process.env.REACT_APP_AGORA_APP_ID);
    localClient.login(userName, "", channelName);
  }, [localClient]);

  useEffect(() => {
    localClient.on('ConnectionStateChanged', (newState, reason) => {

    })
  
    localClient.on('MemberJoined', ({ channelName, args }) => {
      
    })
  
    localClient.on('MemberLeft', ({ channelName, args }) => {

    })
  
    localClient.on('ChannelMessage', async ({ channelName, args }) => {
        const message = args[0].text;
        const messageType = args[0].messageType;
        const user = args[1];
        const today = moment();
        
        switch (messageType) {
          case 'IMAGE':
              dispatch(ChannelChatting(channelName, user, '', today.format("HH:mm"), 'remote', args[0]));
          break;
          case "FILE":
            dispatch(ChannelChatting(channelName, user, '', today.format("HH:mm"), 'remote', args[0]));
            break;
          default:
            dispatch(ChannelChatting(channelName, user, message, today.format("HH:mm"), 'remote', ''));
            break;
      }
    });
  }, []);

  const onDownloadFile = useCallback((mediaId, fileName) => {
    setIsFileLoading(true);
    localClient.downloadChannelMedia(mediaId).then((r) => {
      saveAs(r, fileName);
      setIsFileLoading(false);
    });
    return true;
  }, []);

  const onDrop = useCallback((acceptedFiles) => {
    setFilesStorage(acceptedFiles);
    setOpen(!open);
  }, [filesStorage, open]);

  const onDropRejected = useCallback((error) => {
    alert(error[0].errors[0].code);
  }, []);

  const onSendMessage = useCallback((e) => {
      const today = moment();

      localClient.sendChannelMessage(chattingMessage, channelName).then(() => {
        dispatch(ChannelChatting(channelName, userName, chattingMessage, today.format("HH:mm"), 'local', ''));
        setChattingMessage("");
      })
  }, [chattingMessage])

  const onChattingMessage = useCallback((e) => {
      setChattingMessage(e.currentTarget.value);
  }, [chattingMessage])

  const uploadFile = useCallback(async () => {
    const today = moment();

    setOpen(false);
    dispatch(ChannelChatting(channelName, userName, '', today.format("HH:mm"), 'local', filesStorage));

    await Promise.all(filesStorage.map((file) => {
      if (new RegExp(IMAGE_FORMAT, "i").test(file.name)) {
        localClient
          .sendChannelImageMediaMessage(file, channelName, file);
      } else {
        localClient
          .sendChannelFileMediaMessage(file, channelName, file);
      }
    }));

  }, [open]);

  const handleClose = useCallback(() => {
      setOpen(!open);
  }, [open]);

  const body = (
    <div>
        <h2>파일 전송</h2>
        <h3>다음 파일을 전송합니다.</h3>
        <ul>
        {
            filesStorage.map((file, index) => (
                <li key={index}>{file.name}</li>
            ))
        }
        </ul>
        <span>
            <button onClick={uploadFile}>확인</button>
            <button onClick={handleClose}>취소</button>
        </span>
    </div>
);

  return (
      <>
        <div className="chat__body">
            <div className="inner__body__container">
                <List className={classes.messageArea}>
                    <Dropzone
                        onDrop={onDrop}
                        onDropRejected={onDropRejected}
                        maxSize={32000000}
                    >
                        {({getRootProps}) => (
                            <div {...getRootProps()} className={classes.messageArea}>
                              {messages.length ?
                                  messages.map((message, index) => 
                                      (
                                          <ListItem key={index}>
                                              <ChattingUsersAndMessage userId={userNames[index]} userMessage={message} 
                                                messageTime={messageTimes[index]} track={tracks[index]} fileStorage={fileStorage[index]}
                                                onDownloadFile={onDownloadFile} fileLoading={isFileLoading} />
                                          </ListItem>
                                      )
                                  )
                                :
                                    <></>
                                }
                                <div>
                                  {open && 
                                    <Modal
                                        open={open}
                                        onClose={handleClose}
                                        className={classes.paper}
                                    >
                                        {body}
                                    </Modal>
                                  }
                                </div>
                            </div>
                        )}
                    </Dropzone>
                </List>
            </div>
            <div className="inner__input__container">
                <TextField
                    label="Input Text"
                    fullWidth
                    onChange={onChattingMessage}
                    value={chattingMessage}
                />
                &nbsp;
                <SendOutlinedIcon
                    id="sendOutlinedIcon"
                    onClick={onSendMessage}
                ></SendOutlinedIcon>
            </div>
        </div>
    </>
  );
};

export default React.memo(Chatting);
