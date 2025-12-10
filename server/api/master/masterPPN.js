import { Router } from "express";
const router = Router();

router.post("/view", (req, res)=>{
    res.send("OK")
})
router.post("/add", (req, res)=>{
    res.send("OK")
})
router.post("/edite", (req, res)=>{
    res.send("OK")
})
router.post("/delete", (req, res)=>{
    res.send("OK")
})

export default router