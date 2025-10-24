import { Router } from "express";
import { add, view, update, removeGroup, viewGet } from "../controller/group.js";




const router = Router();


router.get('/', (req, res)=>{
    console.log("GROUP / DI PANGGIIIILL")
    viewGet(req, res);
})
router.post('/view', (req, res)=>{
    console.log("GROUP /view DI PANGGIIIILL")
    view(req, res);
})
router.post('/add',  (req, res)=>{
    add(req, res);
})
router.post('/update', (req, res)=>{
    update(req,res)
})
router.post('/removeData', (req, res)=>{
    removeGroup(req, res)
})









export default router
