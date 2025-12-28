import { Router } from "express";
import { bar, list_documents, pie_status, getProgressByIdDoc } from "../controller/dashboard.js";
import { getAllStep } from "../controller/verification.js";

const router = Router();


router.post("/bar", (req, res)=>{
    bar(req, res);
    // console.log(req.body)
    // res.send("OK")
})
router.post("/frekwensi_pengajuan", (req, res)=>{
    getAllStep(req, res);
})
router.post("/pie_status", (req, res)=>{
    pie_status(req, res);
})

router.post("/list_documents", (req, res)=>{
    list_documents(req, res);
})

router.post("/progres_pengajuan", (req, res)=>{
    getProgressByIdDoc(req, res);
})







export default router