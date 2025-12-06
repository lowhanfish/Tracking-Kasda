import { Router } from "express";
import { add, view, edit } from "../../controller/master/masterTahapan.js";



const router = Router();



router.post('/view', (req,res)=>{
    view(req, res)
})
router.post('/add', (req,res)=>{
    console.log("add masterTahapan di panggil")
    add(req, res)
})
router.post('/edit', (req,res)=>{
    console.log("edit masterTahapan di panggil")
    edit(req, res)
})







export default router