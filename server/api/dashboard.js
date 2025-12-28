import { Router } from "express";
import { bar, frekwensi_pengajuan, pie_status, time_series_history } from "../controller/dashboard.js";


const router = Router();


router.post("/bar", (req, res)=>{
    bar(req, res);
    // console.log(req.body)
    // res.send("OK")

})
router.post("/frekwensi_pengajuan", (req, res)=>{
    frekwensi_pengajuan(req, res);
})
router.post("/pie_status", (req, res)=>{
    pie_status(req, res);
})
router.post("/time_series_history", (req, res)=>{
    time_series_history(req, res);
})







export default router