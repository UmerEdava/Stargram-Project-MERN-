import express from 'express';
import bodyparser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import http from 'http'
import fs from 'fs'
// const io = require('socket.io')
// import * as io from 'socket.io'
import jwt from 'jsonwebtoken';
import fileupload from 'express-fileupload'
import {Server} from 'socket.io'

import userRouter from './routes/user.js'
import moment from 'moment'

const app = express();
const server = http.createServer(app)

const __dirname = path.resolve(path.dirname('')); 
app.use(express.json({limit:"30mb",extended:true}))
app.use(express.urlencoded({limit:"30mb",extended:true}))
app.use(cors())                                        
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileupload())

app.use('/',userRouter)

const io = new Server(server, {   
    cors: {
      origin: "*"
    }
})

let activeUsers = []

io.on('connection', async (socket) => {
    console.log(socket.id + ' ==== connected');
    let users = {}

    // creating a room name that's unique using both user's unique username

    socket.on('join', roomName => {
        console.log('started to make private room',roomName)

        let split = roomName.split('--with--'); // ['username1', 'username2']
        console.log('splitted',split)
    
        let unique = [...new Set(split)].sort((a, b) => (a < b ? -1 : 1)); // ['username1', 'username2']
        console.log('unique',unique)
    
        let updatedRoomName = `${unique[0]}--with--${unique[1]}`; // 'username1--with--username2'

        console.log('rooms',socket.rooms)
    
        console.log(Array.from(socket.rooms))
    
        socket.join(updatedRoomName);
        console.log('joined to updatedRoomName',updatedRoomName)
    
        socket.on(`emitMessage`, message => {
            console.log('MESSAGE RECEIVED')
            // let date = new Date()
            let date = moment(new Date()).format("DD-MM-YYYY HH:mm");
            console.log('date',date)
            message.date = date
            
            Array.from(socket.rooms)
                .filter(it => it !== socket.id)
                .forEach(id => {
                    console.log('last to id:',id) 
                    console.log('message returned')
                    io.to(id).emit('onMessage', message);
                });
        });  
    }); 

    // socket.on('emitMessage',(msg)=>{
    //     console.log('incoming',msg)
    //     let d = new Date()
    //     let date= moment(d).format('YYYY-MM-DD')
    //     let time= moment(d).format('hh:mm:a')
    //     msg.date = date
    //     msg.time = time
    //     socket.emit('inMessage',msg)

    // }) 
  

    // socket.on('message', (msg) => {
    //     console.log('message: message reached: this is base64: ');

    //     // base64.decode(msg, 'sampleVideo.mp4', function(err, output) {
    //     //     console.log('success');
    //     //     const path = __dirname + '/images'
    //     //     output.mv()
    //     // });

    //     // let filePath = '/public/umerTest'
    //     // let buffer = Buffer.from(msg.split(',')[1], 'base64')

    //     // fs.writeFileSync(path.join(__dirname, filePath), buffer)
        
    //     // {from:userId,to:starId,message:base64data}
    //     io.emit(`from:${msg.from},to:${msg.to}`||`from:${msg.to},to:${msg.from}`,msg.message)
    // });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
})

const CONNECTION_URL = 'mongodb+srv://umersanil:umersanil123@cluster0.zlxqa.mongodb.net/Stargram?retryWrites=true&w=majority'

const PORT = process.env.PORT || 3001;

mongoose.connect(CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>server.listen(PORT,()=>console.log(`Server running on port : ${PORT}`))) 
    .catch((error)=>console.log(error.message))

mongoose.set('useFindAndModify', false)