import db from "../db/mysql/index.js";
import dbx from "../db/mysql/egov.js";
import dby from "../db/mysql/simpeg.js";
import dbCondition from "../lib/dbCondition.js";
import dbResolveCondition from "../lib/dbResolveCondition.js";

// // INI DI PAKAI JIKA MENGGUNAKAN DB E-GOV
const db_egov = process.env.DB_USER
const db_simpeg = process.env.DB_SIMPEG

export const getDataUser = async (req, res) => {

    // console.log(req.body)

    const jml = await getJmlUser(req, res)
    const data = await getUser(req, res)
    
    // console.log(data)
    res.send({
        data : data.message,
        jml : Math.ceil((jml.message[0].jml)/req.body.dataLimit),
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
    
        biodata.id,
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



export const getProfile = async(req, res) =>{
    const nip = await getNIPById(req, res);
    const profile = await getUserDetail(req, res)
    const educations = await getUserEducations(req, res)
    
    res.send({
        profile : profile.message[0],
        educations : educations.message,

    })
}


export const getNIPById = async (req, res) =>{

    // console.log(req.body)
    return new Promise((resolve, reject)=>{
        const query = `
            SELECT
            biodata.nip
            FROM biodata
            WHERE biodata.id = '`+req.body.id+`'
        `
        dby.query(query, (err, rows)=>{
            if (err) {
                // console.log(err);
                resolve(err)
            } else {
                // console.log("===========")
                // console.log(rows[0])
                resolve(rows[0])
            }
        })

    })


}


export const getUserDetail = async (req, res)=>{

    var nip = req.body.nip

    return new Promise((resolve, reject)=>{

        const query = `
            SELECT 
            biodata.nama,
            biodata.alamat,
            biodata.gelar_belakang,
            biodata.gelar_depan,
            biodata.alamat,
            biodata.email,
            biodata.kontak as hp,
            biodata.nip,
            jabatan.jabatan as jabatan,
            unit_kerja.unit_kerja unit_kerja
    
            FROM biodata
            LEFT JOIN jabatan jabatan
            ON jabatan._id = biodata.jabatan
        
            LEFT JOIN unit_kerja unit_kerja
            ON unit_kerja.id = jabatan.unit_kerja

            WHERE biodata.nip = '`+nip+`'
        `
    
        dby.query(query, (err, rows)=>{
            dbResolveCondition(resolve, err, rows)
        })
    })

}

export const getUserEducations = async (req, res)=>{

    return new Promise((resolve, reject)=>{

        const query = `
            SELECT 
            pendidikan_formal.*,
            strata_ijazah.keterangan as keterangan_pendidikan
            FROM pendidikan_formal
            
            LEFT JOIN strata_ijazah
            ON strata_ijazah.strata_ijazah_id = pendidikan_formal.strata_ijazah_id
            
            WHERE pendidikan_formal.biodata_id = '`+req.body.id+`'
            ORDER BY pendidikan_formal.strata_ijazah_id
        `
    
        dby.query(query, (err, rows)=>{
            dbResolveCondition(resolve, err, rows)
        })
    })

}


