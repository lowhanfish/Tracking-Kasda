import { Router } from "express";
import {view, approve, reject} from "../controller/verification.js"
import upload from "../multer/index.js";
const router = Router();


router.post('/view', (req, res)=> {
    view(req, res)
})
router.post('/approve', upload.array('files', 10) ,(req, res)=> {

    // Data files yang berhasil di-upload
    // const filesData = req.files.map(file => ({
    //         filename: file.filename,
    //         originalName: file.originalname,
    //         mimetype: file.mimetype,
    //         size: file.size,
    //         path: file.path,
    //         url: `/uploads/${file.filename}`
    //     }));

    approve(req, res)
})
router.post('/reject', (req, res)=>{
    reject(req, res)
})



export default router