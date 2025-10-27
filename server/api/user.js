import { Router } from "express";

import {getDataUser,getProfile, updateAccount} from '../controller/user.js'

const router = Router();


router.post('/view', (req, res)=>{
    getDataUser(req, res);
})
router.post('/detail', (req, res)=>{
    getProfile(req, res);
})

router.post('/update', (req, res)=>{
    updateAccount(req, res);
})



export default router