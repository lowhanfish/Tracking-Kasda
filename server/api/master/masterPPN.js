import { Router } from "express";
const router = Router();

import { all, view, add, editex, deletex } from "../../controller/master/masterPPN.js";

router.post("/", (req, res)=>{
    all(req, res)
})

router.post("/view", (req, res)=>{
    view(req, res)
})
router.post("/add", (req, res)=>{
     add(req, res)
})
router.post("/edit", (req, res)=>{
     editex(req, res)
})
router.post("/delete", (req, res)=>{
     deletex(req, res)
})

export default router