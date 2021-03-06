import express from 'express'
import jwt from 'jsonwebtoken'


import {home,getLogin,userSignup,checkExisting,sendOTP,addProfilePic,verifyOTP,googleSignup,googleLogin,profile,getUserDetails} from '../controllers/users.js'
import {changeProfilePic,changeUserDetails,buyMessages,paymentSuccess,addCredit,sendCelebrityOTP,verifyCelebrityOTP} from '../controllers/users.js';
import {checkCelebrityExisting,addToFavourites,checkMessageSent,getOldChat,getUserDetailsAndIdentification,forgotPasswordNumber,makeMessageSentAndReceived,checkCelebrityVerification,addImage,checkVerified,getAllVerifiedCelebrities,getCelebrityDetails,follow,unFollow,search} from '../controllers/users.js';

const router = express.Router();

const verifyJWT = (req, res, next) => {
    console.log('verifying jwt')
    const token = req.headers["x-access-token"];
    // const starToken = req.headers["x-access-token"]
    // console.log('tooken',token);
    if(!token){
        res.send("Not authenticated")
    } else if(token){
        jwt.verify(token, "stargramSecret", (err, decoded)=>{
            if(err){
                console.log(err);
                res.json({ auth: false, message: "Failed to authenticate"})
            } else {
                req.userId = decoded.id
                console.log('decoded',req.userId)
                next();
            }
        })
    }
    // else if(starToken){
    //     jwt.verify(starToken, "stargramSecret", (err, decoded)=>{
    //         if(err){
    //             console.log(err);
    //             res.json({ auth: false, message: "Failed to authenticate"})
    //         } else {
    //             req.starId = decoded.id
    //             console.log('decoded',req.starId)
    //             next();
    //         }
    //     })
    // }
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
router.post('/verifyCelebrityOTP', verifyCelebrityOTP)
router.post('/checkCelebrityExisting', checkCelebrityExisting)
router.post('/checkCelebrityVerification',verifyJWT, checkCelebrityVerification)
router.post('/addImage', addImage)
router.get('/getAllVerifiedCelebrities', getAllVerifiedCelebrities)
router.get('/getCelebrityDetails', getCelebrityDetails)
router.get('/get')
router.post('/follow', verifyJWT, follow)
router.post('/unFollow', verifyJWT, unFollow)
router.post('/search', search)
router.post('/checkVerified', checkVerified)
router.get('/checkMessageSent', verifyJWT, checkMessageSent)
router.post('/makeMessageSentAndReceived', verifyJWT, makeMessageSentAndReceived)
router.post('/forgotPasswordNumber', verifyJWT, forgotPasswordNumber)
router.get('/getUserDetailsAndIdentification', verifyJWT, getUserDetailsAndIdentification)
router.post('/getOldChat', getOldChat)
router.post('/addToFavourites', addToFavourites)
 
export default router; 