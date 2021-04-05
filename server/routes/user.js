import express from 'express'

import {home,getLogin,userSignup,checkExisting} from '../controllers/users.js'
 
const router = express.Router();

router.get('/', home)
router.post('/register', userSignup)
router.get('/login', getLogin)
router.post('/checkExisting', checkExisting)

export default router;