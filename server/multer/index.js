import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ====== UPLOAD DIRECTORY ======
const uploadDir = path.join(__dirname, '../uploads');

// Buat folder jika belum ada
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// ====== STORAGE CONFIGURATION ======
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Generate nama file unik dengan timestamp
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname, ext);
        cb(null, `${name}-${uniqueSuffix}${ext}`);
    }
});

// ====== FILE FILTER ======
const fileFilter = (req, file, cb) => {
    // Allowed MIME types: PDF dan Image types
    const allowedMimes = [
        'application/pdf',           // PDF
        'image/jpeg',                // JPG
        'image/jpg',                 // JPG alternative
        'image/png',                 // PNG
        'image/gif',                 // GIF
        'image/webp',                // WebP
        'image/svg+xml',             // SVG
        'image/bmp'                  // BMP
    ];

    // Allowed file extensions
    const allowedExtensions = ['.pdf', '.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp'];

    const fileExt = path.extname(file.originalname).toLowerCase();

    if (allowedMimes.includes(file.mimetype) && allowedExtensions.includes(fileExt)) {
        cb(null, true);
    } else {
        cb(new Error(`File type not allowed. Only PDF and image files are permitted. Received: ${file.mimetype}`));
    }
};

// ====== MULTER CONFIGURATION ======
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB max file size
    }
});

export default upload;
