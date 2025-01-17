import React, { useMemo, useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
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
import emoticon from '../assets/img/emoticon.svg';
import send from '../assets/img/send.svg';
import Picker from 'emoji-picker-react';
import Setting from './settingDevice';

const useStyles = makeStyles((theme) => ({
  messageArea: {
    height: '70vh',
    overflowY: 'auto'
  },
  modal: {
    display: 'flex',
    padding: theme.spacing(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  buttons: {
    marginTop: '10vh'
  },
  ok_button: {
    width: '50%',
    height: '100%',
    border: '1px solid white'
  },
  cancel_button: {
    width: '50%',
    height: '100%',
    border: '1px solid white'
  }
}));

const IMAGE_FORMAT = "\\.(bmp|gif|jpg|jpeg|png)$";

const Chatting = ({ useSetting, onUseSetting }) => {
  const classes = useStyles();

  const [chattingMessage, setChattingMessage] = useState("");
  const [emojiUseYn, setEmojiUseYn] = useState(false);
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

  const onEmoticonClick = useCallback(() => {
    setEmojiUseYn(!emojiUseYn);
  }, [emojiUseYn]);

  const onEmojiClick = useCallback((event, emojiObject) => {
    setChattingMessage(chattingMessage+emojiObject.emoji);
  }, [chattingMessage]);

  const modalBody = (
    <div className={classes.paper}>
        <h2 style={{ marginBottom: '2vh' }}>File transfer</h2>
        <h3 style={{ marginBottom: '1vh' }}>Send the following file.</h3>
        <ul>
        {
            filesStorage.map((file, index) => (
                <li key={index}>{file.name}</li>
            ))
        }
        </ul>
        <div className={classes.buttons}>
          <span style={{ width: '100%' }}>
              <button className={classes.ok_button} onClick={uploadFile}>확인</button>
              <button className={classes.cancel_button} onClick={handleClose}>취소</button>
          </span>
        </div>
    </div>
);

  return (
      <>
        <div className="chat__box">
          {useSetting &&
            <Setting onUseSetting={onUseSetting} />
          }

          <div className="chat__body">
            <div className="setting_container">

            </div>
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
                                className={classes.modal}
                            >
                                {modalBody}
                            </Modal>
                          }
                        </div>
                    </div>
                )}
            </Dropzone>
          </div>
          
          <div className="emoji_input">
            {emojiUseYn && <Picker onEmojiClick={onEmojiClick} pickerStyle={{ width: '100%' }} />}
          </div>
          <div className="chat__input">
              <img src={emoticon} alt="" onClick={onEmoticonClick} />
              <input type="text" placeholder="Type a message" onChange={onChattingMessage} value={chattingMessage} />
              <img src={send} alt="" onClick={onSendMessage} />
          </div>
      </div>
    </>
  );
};

export default React.memo(Chatting);
