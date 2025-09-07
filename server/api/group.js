import { Router } from "express";
import { add } from "../controller/group.js";




const router = Router();


router.get('/', (req, res)=>{
    res.json("Active");
})


router.post('/view', (req, res)=>{

})
router.post('/add',  (req, res)=>{
    add(req, res);
})
router.post('/update', (req, res)=>{

})
router.post('/remove', (req, res)=>{

})









export default router
