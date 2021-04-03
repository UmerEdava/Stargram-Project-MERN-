import express from 'express';
import bodyparser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import userRouter from './routes/user.js'

const app = express();



app.use(express.json({limit:"30mb",extended:true}))
app.use(express.urlencoded({limit:"30mb",extended:true}))
app.use(cors())

app.use('/',userRouter)

const CONNECTION_URL = 'mongodb+srv://umersanil:umersanil123@cluster0.zlxqa.mongodb.net/Stargram?retryWrites=true&w=majority'

const PORT = process.env.PORT || 3001;

mongoose.connect(CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>app.listen(PORT,()=>console.log(`Server running on port : ${PORT}`))) 
    .catch((error)=>console.log(error.message))

mongoose.set('useFindAndModify', false)
