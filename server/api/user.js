import { Router } from "express";

import {getDataUser,getProfile} from '../controller/user.js'

const router = Router();


router.post('/view', (req, res)=>{
    getDataUser(req, res);
})
router.post('/detail', (req, res)=>{
    getProfile(req, res);
})



export default router