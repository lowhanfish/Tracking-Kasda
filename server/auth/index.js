import express from "express";
import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import uniqid from "uniqid";
import db from "../db/mysql/egov.js";


const app = express();
const router = express.Router();
app.use(router);



const schema = Joi.object({
    username: Joi.string()
        .pattern(/^[a-zA-Z0-9_]*$/)
        .alphanum()
        .min(6)
        .max(16)
        .required(),
    password: Joi.string()
        .pattern(/^[a-zA-Z0-9_]*$/)
        .alphanum()
        .min(6)
        .max(16)
        .required(),
});


const respondError422 = (res, next, text)=>{
res.status(422);
    const error = new Error(text);
    next(error);
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
    console.log(result);
    res.json(result.error)
    
    
    // if (result.error == null || result.error == undefined) {
    //     let query = ` SELECT 
    //         egov.users.*, 
    //         simpeg.unit_kerja.unit_kerja as unit_kerja_nama,
    //         simpeg.unit_kerja.alamat as unit_kerja_alamat,

    //         simpeg.biodata.id as bio_id,
    //         simpeg.biodata.nama as bio_nama,
    //         simpeg.biodata.gelar_depan as bio_gelar_depan,
    //         simpeg.biodata.gelar_belakang as bio_gelar_belakang,
    //         simpeg.biodata.tempat_lahir  as bio_tempat_lahir ,
    //         simpeg.biodata.ttl as bio_ttl,
    //         simpeg.biodata.gol as bio_gol,
    //         simpeg.biodata.jabatan as bio_jabatan ,
    //         simpeg.biodata.alamat as bio_alamat,
    //         simpeg.instansi.id as instansi_id,
    //         simpeg.instansi.instansi as instansi_nama,


    //         monev_pembangunan.menu_klp.akses_unit as akses_unit


          

    //     FROM egov.users 

    //     JOIN simpeg.unit_kerja 
    //         ON egov.users.unit_kerja = simpeg.unit_kerja.id

    //     JOIN simpeg.instansi 
    //         ON simpeg.instansi.id = simpeg.unit_kerja.instansi

    //     JOIN simpeg.biodata 
    //         ON egov.users.nama_nip = simpeg.biodata.nip

    //     LEFT JOIN monev_pembangunan.menu_klp 
    //         ON monev_pembangunan.menu_klp.id = egov.users.monev_pembangunan

    //     WHERE users.username = '`+req.body.username+`';`

    //     db.query(query, (err, row)=>{
    //         if (row.length <= 0) {
    //             console.log("akun tidak di temukan");
    //             respondError422(res, next, 'Akun tidak ditemukan')
    //         } else {
    //             var user = {};
    //             row.forEach(user => {
    //                 user = user;
    //             });

    //         }
    //         const payload =  {
    //                 _id: user.id,
    //                 username : user.username,
    //                 profile : {
    //                     username : user.username,
    //                     nama : user.nama,
    //                     hp : user.hp,
    //                     email : user.email,
    //                     id_pengguna : user.id_pengguna,
    //                 }
    //             };


    //             // prepare bcrypt compare

    //     })
    // } else {
        
    // }


})


router.post('/general_register',(req, res)=>{
    



})


export default router