const firebase = require('firebase/app');
const firebaseConfig = require('./config/firebaseConfig.js');
const express = require('express');
const router = express.Router();
const bodyParder = require('body-parser');
const redis = require('redis');

require('firebase/firestore');

const app = express();

app.use(bodyParder({
    extended: true
}));
app.use(bodyParder.json());

//const client = redis.createClient(process.env.REDIS_URL);
const client = redis.createClient();
client.on("error", function(err, data){
    if(err) throw err;
})

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

/*
doc을 채널 만든 사람이름으로 저장
db.collection("RoomList").add({
    roomName: "1",
    roomPassword: "1234"
}).then((e) => console.log("저장완료 : " + e))
.catch((err) => console.log("저장 실패 : " + err))*/

app.post('/api/save/roomUserName', (req, res) =>{
    const bodyData = req.body;

    client.sadd(bodyData.channelName,bodyData.userName);
    return res.status(200).json({
        success: true
    })
})

app.post('/api/get/roomUserName', (req, res) => {
    const bodyData = req.body;

    client.smembers(bodyData.channelName, (error, items) => {
        if(error){
            return res.status(500).json({
                success: false,
                err: error
            })
        }

        return res.status(200).json({
            success: true,
            userList: items
        })
    });
})

app.post('/api/remove/roomUserName', (req, res) => {
    const bodyData = req.body;

    if(client.srem(bodyData.channelName,bodyData.userName)){
        return res.status(200).json({
            success: true
        })
    }else{
        return res.status(500).json({
            success: false
        })
    }
    
})

const port = process.env.PORT || 5000;
app.listen(port, () =>  console.log(`app listening on port ${port}!!`))