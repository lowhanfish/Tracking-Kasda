import { Router } from "express";
import { add, view } from "../../controller/master/masterTahapan.js";



const router = Router();



router.post('/view', (req,res)=>{
    view(req, res)
})
router.post('/add', (req,res)=>{
    add(req, res)
})







export default router