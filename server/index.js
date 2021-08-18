const firebase = require('firebase/app');
const firebaseConfig = require('./config/firebaseConfig.js');
const express = require('express');
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


const port = process.env.PORT || 5000;
app.listen(port, () =>  console.log(`app listening on port ${port}!!`))