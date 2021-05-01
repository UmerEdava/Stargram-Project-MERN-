import express from 'express';
import bodyparser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';

import userRouter from './routes/user.js'

import jwt from 'jsonwebtoken';

const app = express();

const __dirname = path.resolve(path.dirname('')); 
app.use(express.json({limit:"30mb",extended:true}))
app.use(express.urlencoded({limit:"30mb",extended:true}))
app.use(cors())  
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',userRouter)

const CONNECTION_URL = 'mongodb+srv://umersanil:umersanil123@cluster0.zlxqa.mongodb.net/Stargram?retryWrites=true&w=majority'

const PORT = process.env.PORT || 3001;

mongoose.connect(CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>app.listen(PORT,()=>console.log(`Server running on port : ${PORT}`))) 
    .catch((error)=>console.log(error.message))

mongoose.set('useFindAndModify', false)
