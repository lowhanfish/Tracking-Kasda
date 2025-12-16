import { Router } from "express";
const router = Router();

import { deletex } from "../controller/files.js";


router.post('/delete', async (req, res)=>{
    const response = await deletex(req, req.body.db_name, req.body.ref_id);
    res.send(response);
})


export default router;