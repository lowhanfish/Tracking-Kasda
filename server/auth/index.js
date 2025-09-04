import express from "express";
import Joi from "joi";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import uniqid from "uniqid";
import db from "../db/mysql/egov.js";

const router = express.Router();

const schema = Joi.object({
    username : Joi.string()
    .pattern(new RegExp('/^[a-zA-Z0-9_]*$/'))
    .alphanum()
    .min(6)
    .max(12)
    .required(),
    password : Joi.string()
    .pattern(new RegExp('/^[a-zA-Z0-9_]*$/'))
    .alphanum()
    .min(6)
    .max(12)
    .required(),
})


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

    const result = schema.validate({ username: req.body.username, password: req.body.password });
    console.log(result);

    res.send(result)

    if (result.error == null || result.error == undefined) {
        let query = ``
        db.query(query, (err, row)=>{
            if (row.length <= 0) {
                console.log("akun tidak di temukan");
                respondError422(res, next, 'Akun tidak ditemukan')
            } else {
                var user = {};
                row.forEach(user => {
                    user = user;
                });

            }
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

        })
    } else {
        
    }


})


router.post('/general_register',(req, res)=>{
    



})


