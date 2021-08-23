const express = require('express');
const router = express.Router();
const redis = require('redis');
const firebase = require('firebase/app');
const firebaseConfig = require('../config/firebaseConfig.js');
require('firebase/firestore');

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

router.post('/save/roomUserName', (req, res) =>{
    const bodyData = req.body;

    client.sadd(bodyData.channelName,bodyData.userName);
    return res.status(200).json({
        success: true
    })
})

router.post('/get/roomUserName', (req, res) => {
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

router.post('/remove/roomUserName', (req, res) => {
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

router.post('/room/register', (req, res) => {
    const bodyData = req.body;

    db.collection("RoomList").add({
        roomNumber: bodyData.roomNumber,
        roomPassword: bodyData.roomPassword,
        makeUserName: bodyData.makeUserName
    })
    .then((e) => {
        return res.status(200).json({
            success: true
        })
    })
    .catch((err) => {
        return res.status(500).json({
            success: false,
            error: err
        });
    })
})

router.get('/room/roomList', (req, res) => {
    const roomArray = []

    db.collection("RoomList").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
           roomArray.push(doc.data());
        });

        return res.status(200).json({
            success: true,
            roomList: roomArray
        })
    }).catch((err) => {
        return res.status(500).json({
            success: false,
            error: err
        })
    })
})

module.exports = router;