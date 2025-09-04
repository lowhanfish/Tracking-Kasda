import jwt from "jsonwebtoken";
import db from "../db/mysql/index.js"; 

function checkTokenAndSetUser(req, res, next) {
    const authHeader = req.get('authorization');
    if (!authHeader) {
        return next(); // Jika tidak ada header, lewati saja
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return next(); // Jika header tidak memiliki token, lewati
    }

    // Tangani verifikasi token di sini
    jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {
        if (error) {
            // Jika token tidak valid, langsung kirim respons 401 dan hentikan
            return res.status(401).json({
                message: "Token tidak valid atau kedaluwarsa."
            });
        }
        // Jika token valid, set req.user dan lanjutkan
        req.user = user;
        next();
    });
}

function isLoggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        // const error = new Error('SILAHKAN LOGIN DULU..!!!');
        const error = 'SILAHKAN LOGIN DULU..!!!';
        res.status(401);
        next(error);
    }
}

function sideMenuMiddleware(req, res, next) {
    if (!req.user || !req.user.profile || !req.user.profile.absensi) {
        const error = new Error('Data profil tidak lengkap.');
        res.status(400);
        return next(error);
    }

    const absensiId = req.user.profile.absensi;

    // Perbaikan: Gunakan placeholder (?) untuk mencegah SQL Injection
    const query = `
        SELECT 
            menu_klp_list.*,
            menu.route
        FROM menu_klp_list
        JOIN menu ON menu_klp_list.menu_id = menu.id
        WHERE menu_klp_list.menu_klp_id = ?
    `;

    // Gunakan objek `db` yang sudah diimpor
    db.query(query, [absensiId], (err, rows) => {
        if (err) {
            console.error(err);
            const error = new Error('Terjadi kesalahan saat mengambil menu.');
            res.status(500);
            return next(error);
        }
        req.menu_akses = rows;
        next();
    });
}

export {
    checkTokenAndSetUser,
    isLoggedIn,
    sideMenuMiddleware
};