const express = require('express');
const router = express.Router();
const redis = require('redis');
const firebase = require('firebase/app');
const firebaseConfig = require('../config/firebaseConfig.js');
require('firebase/firestore');

const client = redis.createClient(process.env.REDIS_URL);
//const client = redis.createClient();
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

router.get('/', (req, res) => {
    return res.status(200).json({
        success: true
    })
})

router.post('/save/roomUserName', (req, res) =>{
    const bodyData = req.body;
   
    client.sadd(bodyData.channelName, bodyData.userName);
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

router.post('/room/register', async (req, res) => {
    const bodyData = req.body;
    const snapshot = await db.collection("RoomList").where("roomNumber", "==", bodyData.roomNumber).get();
    
    if(snapshot.empty){
        db.collection("RoomList").add({
            roomName: bodyData.roomName,
            roomNumber: bodyData.roomNumber,
            roomPassword: bodyData.roomPassword,
            makeUserName: bodyData.makeUserName,
            photoURL: bodyData.photoURL
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
    }else{
        return res.status(200).json({
            success : false
        });
    }
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

router.post('/room/getRoomInfo', (req, res) => {
    const bodyData = req.body;

    db.collection("RoomList").where("roomNumber", "==", bodyData.channelName)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if(bodyData.roomPassword === doc.data().roomPassword){
                    return res.status(200).json({
                        passwordCheckResult : true
                    });
                }else{
                    return res.status(200).json({
                        passwordCheckResult : false,
                        error: 'Wrong Password'
                    });
                }
            });
        }).catch((err) => {
            return res.status(500).json({
                passwordCheckResult: false,
                error: err
            })
        })
});

module.exports = router;