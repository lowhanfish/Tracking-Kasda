import express from "express";
import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import uniqid from "uniqid";
import db from "../db/mysql/egov.js";


const app = express();
const router = express.Router();
app.use(router);


// console.log(process.env.DB_USER_HOST)


const schema = Joi.object({
  username: Joi.string()
    .pattern(/^[a-zA-Z0-9_!@#$%^&*()+-=]*$/) // Mengizinkan simbol
    .min(6) // Panjang minimum 6 karakter
    .max(16) // Panjang maksimum 16 karakter
    .required()
    .messages({
      'string.min': 'Username minimal 6 karakter',
      'string.max': 'Username maksimal 16 karakter',
      'string.pattern.base': 'Username hanya boleh berisi huruf, angka, underscore, dan simbol tertentu.',
      'string.empty': 'Username tidak boleh kosong',
      'any.required': 'Username wajib diisi',
    }),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9_!@#$%^&*()+-=]*$/)
    .min(6)
    .max(16)
    .required()
    .messages({
      'string.min': 'Password minimal 6 karakter',
      'string.max': 'Password maksimal 16 karakter',
      'string.pattern.base': 'Password hanya boleh berisi huruf, angka, underscore, dan simbol tertentu.',
      'string.empty': 'Password tidak boleh kosong',
      'any.required': 'Password wajib diisi',
    }),
});


const respondError422 = (res, next, text)=>{
    res.status(422);
    // const error = new Error(text);
    // console.log(error)
    // next(error);
    // next(text);
    res.json(text)
}


router.get('/', (req, res)=>{
    res.json({
        message: 'login active'
    });
})



router.post('/login', (req, res, next)=>{
    // console.log(req.body)
    // res.json("test")

    const result = schema.validate({ username: req.body.username, password: req.body.password });

    // console.log(result)
    
    if (result.error == null || result.error == undefined) {
        let query = ` SELECT 
            egov.users.*, 
            simpeg.unit_kerja.unit_kerja as unit_kerja_nama,
            simpeg.unit_kerja.alamat as unit_kerja_alamat,

            simpeg.biodata.id as bio_id,
            simpeg.biodata.nama as bio_nama,
            simpeg.biodata.gelar_depan as bio_gelar_depan,
            simpeg.biodata.gelar_belakang as bio_gelar_belakang,
            simpeg.biodata.tempat_lahir  as bio_tempat_lahir ,
            simpeg.biodata.ttl as bio_ttl,
            simpeg.biodata.gol as bio_gol,
            simpeg.biodata.jabatan as bio_jabatan ,
            simpeg.biodata.alamat as bio_alamat,
            simpeg.instansi.id as instansi_id,
            simpeg.instansi.instansi as instansi_nama,
            monev_pembangunan.menu_klp.akses_unit as akses_unit

        FROM egov.users 

        JOIN simpeg.unit_kerja 
            ON egov.users.unit_kerja = simpeg.unit_kerja.id

        JOIN simpeg.instansi 
            ON simpeg.instansi.id = simpeg.unit_kerja.instansi

        JOIN simpeg.biodata 
            ON egov.users.nama_nip = simpeg.biodata.nip

        LEFT JOIN monev_pembangunan.menu_klp 
            ON monev_pembangunan.menu_klp.id = egov.users.monev_pembangunan

        WHERE users.username = '`+req.body.username+`';`

        db.query(query, (err, row)=>{
            if (row.length <= 0) {
                // console.log("akun tidak di temukan");
                respondError422(res, next, 'Akun tidak ditemukan')
            } else {
                var user = row[0];
                
                
                const payload =  {
                    _id: user.id,
                    username : user.username,
                    profile : {
                        username : user.username,
                        nama : user.nama,
                        hp : user.hp,
                        email : user.email,
                        id_pengguna : user.id_pengguna,
                    }
                };
                // prepare bcrypt compare
                
                // console.log(user)
                    // console.log("password", req.body.password)
                    // console.log("Token_secret : ", process.env.TOKEN_SECRET);
                    // console.log("hash", user.password)
                bcrypt.compare(req.body.password, user.password).then((result)=>{
                    if (result) {

                        jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '24h' }, (err, token)=>{
                            if (err) {
                                respondError422(res, next, "Kesalahan dalam pembuatan token, silahkan login ulang..!");
                            } else {
                                console.log(token)
                                res.json({token : token, profile : payload});
                            }
                        });
                        
                    } else {
                        respondError422(res, next, "Username atau Password Salah..!")
                    }

                })

            }

        })
    } else {
        respondError422(res, next, result.error.details[0].message)
        // res.json(result.error.details[0].message)
    }

})


router.post('/general_register',(req, res)=>{
    
})


export default router