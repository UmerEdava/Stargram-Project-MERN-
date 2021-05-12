import express from 'express';
import bodyparser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import http from 'http'
// const io = require('socket.io')
// import * as io from 'socket.io'
import jwt from 'jsonwebtoken';
import {Server} from 'socket.io'

import userRouter from './routes/user.js'

const app = express();
const server = http.createServer(app)

const __dirname = path.resolve(path.dirname('')); 
app.use(express.json({limit:"30mb",extended:true}))
app.use(express.urlencoded({limit:"30mb",extended:true}))
app.use(cors())                                        
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',userRouter)

const io = new Server(server, {   
    cors: {
      origin: "*"
    }
})

io.on('connection', (socket) => {
    console.log('A user is connected')

    socket.on('message', (msg) => {
        console.log('message: ' + msg);
        io.emit('message',msg)
    });

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