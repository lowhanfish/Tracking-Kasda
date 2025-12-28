import { Router } from "express";
const router = Router();


router.post("/bar", (req, res)=>{
    res.send("OK")
})
router.post("/frekwensi_pengajuan", (req, res)=>{
    res.send("OK")
})
router.post("/pie_status", (req, res)=>{
    res.send("OK")
})
router.post("/time_series_history", (req, res)=>{
    res.send("OK")
})







export default router