import { Router } from "express";
import { add, view, update, removeGroup } from "../controller/group.js";




const router = Router();


router.get('/', (req, res)=>{
    res.json("Active");
})


router.get('/', (req, res)=>{
    viewGet(req, res);
})
router.post('/view', (req, res)=>{
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
