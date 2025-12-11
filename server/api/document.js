import { Router } from "express";
const router = Router();
import upload from "../multer/index.js";

router.post("/add", upload.array('files', 10), (req, res) => {
    try {
        // Validasi file sudah di-upload
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No files found. Please upload PDF or image files.'
            });
        }

        // Data files yang berhasil di-upload
        const filesData = req.files.map(file => ({
            filename: file.filename,
            originalName: file.originalname,
            mimetype: file.mimetype,
            size: file.size,
            path: file.path,
            url: `/uploads/${file.filename}`
        }));

        // Bisa menambahkan data dari req.body jika ada
        const formData = req.body;

        console.log('Files uploaded:', filesData);
        console.log('Form data:', formData);

        // Response sukses
        res.json({
            success: true,
            message: `${req.files.length} file(s) uploaded successfully`,
            count: req.files.length,
            files: filesData,
            data: formData
        });

    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to upload files'
        });
    }
})





export default router;