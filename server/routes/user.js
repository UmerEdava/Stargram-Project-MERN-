import express from 'express'

import {home,getLogin,userSignup,checkExisting,sendOTP,addProfilePic,verifyOTP} from '../controllers/users.js'
 
const router = express.Router();

router.get('/', home)
router.post('/register', userSignup)
router.get('/login', getLogin)
router.post('/checkExisting', checkExisting)
router.post('/sendOTP', sendOTP)
router.post('/verifyOTP', verifyOTP)
router.post('/addProfilePic', addProfilePic)

export default router;