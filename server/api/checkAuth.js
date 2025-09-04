import { Router } from 'express';

const router = Router();



router.get('/',(req, res)=>{
    res.json("OK")
})


export default router;