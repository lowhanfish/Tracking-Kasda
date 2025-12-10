import { Router } from "express";
const router = Router();

import { view, add, editex, deletex } from "../../controller/master/masterPPH";

router.post("/view", (req, res)=>{
    view(req, res)
})
router.post("/add", (req, res)=>{
     add(req, res)
})
router.post("/edite", (req, res)=>{
     editex(req, res)
})
router.post("/delete", (req, res)=>{
     deletex(req, res)
})

export default router