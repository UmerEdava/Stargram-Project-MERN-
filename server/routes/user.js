import express from 'express'

import {home,getLogin} from '../controllers/users.js'
 
const router = express.Router();

router.get('/', home)
router.get('/login', getLogin)

export default router;