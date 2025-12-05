import {Router} from 'express';
const router = Router();



router.post('/add', (req, res)=>{
    console.log(req.body)
    res.send("DARI CONTROLLER MASTER TAHAPAN")
})







export default router;