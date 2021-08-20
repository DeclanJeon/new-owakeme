import React, { useMemo, useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Fab from "@material-ui/core/Fab";
import RTMClient from "../rtm-client";
import ChattingUsersAndMessage from "./chattingUsersAndMessage";
import Dropzone from "react-dropzone";
import { saveAs } from "file-saver";
import "../assets/css/chat.css";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";

const useStyles = makeStyles({});

const IMAGE_FORMAT = "\\.(bmp|gif|jpg|jpeg|png)$";

const Chatting = () => {
  const classes = useStyles();
  const [chattingMessage, setChattingMessage] = useState("");
  const [messageStorage, setMessageStorage] = useState([]);
  const [userStorage, setUserStorage] = useState([]);
  const [location, setLocation] = useState([]);
  const [filePath, setFilePath] = useState("");

  const channelName = useSelector((state) => state.channelReducer.channelName);
  const userName = useSelector((state) => state.userReducer.userName);

  const localClient = useMemo(() => {
    const client = new RTMClient();
    return client;
  }, []);

  useEffect(() => {
    localClient.init(process.env.REACT_APP_AGORA_APP_ID);
    localClient.login(userName, "", channelName);
  }, [localClient]);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map((files) => {
      if (new RegExp(IMAGE_FORMAT, "i").test(files.name)) {
        localClient
          .sendChannelImageMediaMessage(files, channelName, files)
          .then(() => {
            alert("이미지 업로드 완료");
          });
      } else {
        localClient
          .sendChannelFileMediaMessage(files, channelName, files)
          .then(() => {
            alert("파일 업로드 완료");
          });
      }
    });
  }, []);

  const onDropRejected = useCallback((error) => {
    alert(error[0].errors[0].code);
  }, []);

  const onSendMessage = useCallback(
    (e) => {
      localClient.sendChannelMessage(chattingMessage, channelName).then(() => {
        setChattingMessage("");
        setLocation([...location, "right"]);

        setMessageStorage([...messageStorage, chattingMessage]);
        setUserStorage([...userStorage, userName]);
      });
    },
    [chattingMessage]
  );

  const onChattingMessage = useCallback(
    (e) => {
      setChattingMessage(e.currentTarget.value);
    },
    [chattingMessage]
  );

  localClient.on("ConnectionStateChanged", (newState, reason) => {});

  localClient.on("MessageFromPeer", async (message, peerId) => {});

  localClient.on("MemberJoined", ({ channelName, args }) => {});

  localClient.on("MemberLeft", ({ channelName, args }) => {});

  localClient.on("ChannelMessage", async ({ channelName, args }) => {
    const message = args[0].text;
    const messageType = args[0].messageType;
    const mediaId = args[0].mediaId;
    const fileName = args[0].fileName;
    const user = args[1];

    const reader = new FileReader();
    switch (messageType) {
      case "IMAGE":
        localClient.downloadChannelMedia(mediaId).then((r) => {
          reader.readAsDataURL(r);
          reader.onload = function (e) {
            setFilePath(e.target.result);
          };
          saveAs(r, fileName);
        });
        break;
      case "FILE":
        localClient.downloadChannelMedia(mediaId).then((r) => {
          reader.readAsDataURL(r);
          reader.onload = function (e) {
            setFilePath(e.target.result);
          };
          saveAs(r, fileName);
        });
        break;
      default:
        setLocation([...location, "left"]);
        setMessageStorage([...messageStorage, message]);
        setUserStorage([...userStorage, user]);
        break;
    }
  });

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
              {({ getRootProps }) => (
                <div {...getRootProps()} className={classes.messageArea}>
                  {messageStorage.length ? (
                    messageStorage.map((message, index) => (
                      <ListItem key={index}>
                        <ChattingUsersAndMessage
                          location={location[index]}
                          userId={userStorage[index]}
                          userMessage={message}
                          messageTime="09:30"
                        />
                      </ListItem>
                    ))
                  ) : (
                    <></>
                  )}
                  {filePath ? <img src={filePath} /> : <></>}
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
