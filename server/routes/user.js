import express from 'express'
import jwt from 'jsonwebtoken';

import {home,getLogin,userSignup,checkExisting,sendOTP,addProfilePic,verifyOTP,googleSignup,googleLogin,profile,getUserDetails} from '../controllers/users.js'
import {changeProfilePic} from '../controllers/users.js';
 
const router = express.Router();

const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if(!token){
        res.send("Not authenticated")
    } else {
        jwt.verify(token, "stargramSecret", (err, decoded)=>{
            if(err){
                res.json({ auth: false, message: "Failed to authenticate"})
            } else {
                req.userId = decoded._id
                next();
            }
        })
    }
}

router.get('/',verifyJWT, home)
router.post('/register', userSignup)
router.post('/login', getLogin)
router.post('/checkExisting', checkExisting)
router.post('/sendOTP', sendOTP)
router.post('/verifyOTP', verifyOTP)
router.post('/addProfilePic', addProfilePic)
router.post('/googleSignup', googleSignup)
router.post('/googleLogin', googleLogin)
router.get('/profile',verifyJWT, profile)
router.get('/getUserDetails',verifyJWT, getUserDetails)
router.post('/changeProfilePic', changeProfilePic)

export default router;