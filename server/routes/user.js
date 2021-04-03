import express from 'express'

import {home,getLogin,userSignup} from '../controllers/users.js'
 
const router = express.Router();

router.get('/', home)
router.post('/register', userSignup)
router.get('/login', getLogin)

export default router;