import express from 'express'
import jwt from 'jsonwebtoken'


import {home,getLogin,userSignup,checkExisting,sendOTP,addProfilePic,verifyOTP,googleSignup,googleLogin,profile,getUserDetails} from '../controllers/users.js'
import {changeProfilePic,changeUserDetails,buyMessages,paymentSuccess,addCredit,sendCelebrityOTP} from '../controllers/users.js';
 
const router = express.Router();

const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"];
    // console.log('tooken',token);
    if(!token){
        res.send("Not authenticated")
    } else {
        jwt.verify(token, "stargramSecret", (err, decoded)=>{
            if(err){
                console.log(err);
                res.json({ auth: false, message: "Failed to authenticate"})
            } else {
                req.userId = decoded.id
                console.log('decoded')
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
router.post('/changeUserDetails',verifyJWT, changeUserDetails)
router.post('/buy_messages', buyMessages)
router.post('/payment_success', paymentSuccess)
router.post('/add_credit',verifyJWT, addCredit)
router.post('/sendCelebrityOTP', sendCelebrityOTP)


export default router;