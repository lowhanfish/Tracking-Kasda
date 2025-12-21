import { Router } from "express";
const router = Router();
import upload from "../multer/index.js";


import { view, viewOne, add, editex, deletex } from "../controller/document.js";
import { viewTahapanByDocument } from "../controller/master/masterTahapan.js";

router.post("/view", (req, res) => {
    // console.log("VIEW DI PANGGIL");
    view(req, res);
})
router.post("/viewOne", (req, res) => {
    // console.log("VIEW ONE DI PANGGIL");
    viewOne(req, res);
})
router.post("/add", upload.array('files', 10), (req, res) => {
    add(req, res);
    // Data files yang berhasil di-upload
    // const filesData = req.files.map(file => ({
        //     filename: file.filename,
        //     originalName: file.originalname,
        //     mimetype: file.mimetype,
        //     size: file.size,
        //     path: file.path,
        //     url: `/uploads/${file.filename}`
        // }));
    })
    
    
    
    router.post("/edit", upload.array('files', 10), (req, res) => {
        console.log("EDIT REG DOK DI PANGGIL");
        // console.log(req.body);
        editex(req, res);
    })
    router.post("/delete", (req, res) => {
        console.log("DELETE DOCUMENT DI PANGGIL");
        deletex(req, res);
    })


    router.post('/viewTahapanByDocument', (req, res)=>{
        viewTahapanByDocument(req, res);
    })
    
    
    export default router;