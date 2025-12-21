import { Router } from "express";
import {view, verification, reject} from "../controller/verification.js"
const router = Router();


router.post('/view', (req, res)=> {
    view(req, res)
})
router.post('/verification', (req, res)=> {
    verification(req, res)
})
router.post('/reject', (req, res)=>{
    reject(req, res)
})



export default router