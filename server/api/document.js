import { Router } from "express";
const router = Router();
import upload from "../multer/index.js";

router.post("/add", upload.array('files', 10), (req, res) => {
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





export default router;