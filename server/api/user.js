import { Router } from "express";

import {getDataUser} from '../controller/user.js'

const router = Router();


router.post('/view', (req, res)=>{
    getDataUser(req, res);
})



export default router