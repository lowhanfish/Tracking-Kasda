import db from "../db/mysql/index.js";
import dbx from "../db/mysql/egov.js";
import dbCondition from "../lib/dbCondition.js";
import dbResolveCondition from "../lib/dbResolveCondition.js";

// // INI DI PAKAI JIKA MENGGUNAKAN DB E-GOV
const db_egov = process.env.DB_USER
const db_simpeg = process.env.DB_SIMPEG

export const getDataUser = async (req, res) => {

    const jml = await getJmlUser(req, res)
    const data = await getUser(req, res)
    
    // console.log(data)
    res.send({
        data : data.message,
        jml : jml.message[0].jml,
    });
    
}


// // INI DI PAKAI JIKA TIDAK MENGGUNAKAN DB E-GOV

// export const getDataUser = (req, res) =>{
//     const query = `
//     SELECT
//     users.username,
//     users.name,
//     users.email,
//     users.address,
//     users.phone,
//     users.createdAt,
//     users.createdBy
//     FROM users
//     `
//     db.query(query, (err, rows)=>{
//         dbCondition(res, err, rows)
//     })
// }


export const getUser = async (req, res)=>{

    // console.log(req.body)

    const limit = req.body.dataLimit
    const cari = req.body.searchData


    return new Promise((resolve, reject)=>{

        const query = `
        SELECT
        users.username,
        users.email,
        users.hp,
        users.nama_nip as nip,
    
        biodata.nama,
        biodata.alamat,
        biodata.gelar_belakang,
        biodata.gelar_depan,
    
        jabatan.jabatan as jabatan,
    
        unit_kerja.unit_kerja unit_kerja
    
        FROM `+db_egov+`.users users
    
        LEFT JOIN `+db_simpeg+`.biodata biodata
        ON biodata.nip = users.nama_nip
    
        LEFT JOIN `+db_simpeg+`.jabatan jabatan
        ON jabatan._id = biodata.jabatan
    
        LEFT JOIN `+db_simpeg+`.unit_kerja unit_kerja
        ON unit_kerja.id = jabatan.unit_kerja

        WHERE biodata.nama LIKE '%`+cari+`%'
    
        LIMIT `+limit+`
    
        `
        dbx.query(query, (err, rows) => {
            dbResolveCondition(resolve, err, rows)
        })
    })
    
}

export const getJmlUser = (req, res) =>{


    return new Promise((resolve, reject)=>{

        const query = `
        SELECT
        
        count(users.id) as jml
    
        FROM `+db_egov+`.users users
    
        LEFT JOIN `+db_simpeg+`.biodata biodata
        ON biodata.nip = users.nama_nip
    
        LEFT JOIN `+db_simpeg+`.jabatan jabatan
        ON jabatan._id = biodata.jabatan
    
        LEFT JOIN `+db_simpeg+`.unit_kerja unit_kerja
        ON unit_kerja.id = jabatan.unit_kerja

        WHERE biodata.nama LIKE '%`+req.body.searchData+`%'
    
        `
        dbx.query(query, (err, rows) => {
            dbResolveCondition(resolve, err, rows)
        })
    })

}

export const updateAccount = (req, res) => {

}
export const updateProfile = (req, res) => {

}

export const countUsersGroup = async (req, res) => {

    return new Promise((resolve, reject) => {

        const query = `
            
        `

        db.query(query, () => {
            dbResolveCondition(resolve, err, rows)
        })
    })

}

export const updateUsersGroup = async (req, res) => {

    return new Promise((resolve, reject) => {
        const query = `
            UPDATE users_group
            SET
            group_id = `+ req.body.group_id + `
            WHERE
            user_id = '`+ req.body.user_id + `'
        `

        db.query(query, () => {
            dbResolveCondition(resolve, err, rows)
        })

    })

}

export const addUsersGroup = async (req, res) => {

    return new Promise((resolve, reject) => {
        const query = `
            
        `

        db.query(query, () => {
            dbResolveCondition(resolve, err, rows)
        })

    })
}

