import express from 'express'

import {home,getLogin,userSignup,checkExisting,sendOTP,addProfilePic,verifyOTP,googleSignup,googleLogin,getUserDetails} from '../controllers/users.js'
 
const router = express.Router();

router.get('/', home)
router.post('/register', userSignup)
router.post('/login', getLogin)
router.post('/checkExisting', checkExisting)
router.post('/sendOTP', sendOTP)
router.post('/verifyOTP', verifyOTP)
router.post('/addProfilePic', addProfilePic)
router.post('/googleSignup', googleSignup)
router.post('/googleLogin', googleLogin)
router.get('/profile', getUserDetails)

export default router;