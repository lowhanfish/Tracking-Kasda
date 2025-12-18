import db from "../db/mysql/index.js";
import dbx from "../db/mysql/egov.js";
import dby from "../db/mysql/simpeg.js";
import dbCondition from "../lib/dbCondition.js";
import dbResolveCondition from "../lib/dbResolveCondition.js";

// // INI DI PAKAI JIKA MENGGUNAKAN DB E-GOV
const db_main = process.env.DB_MAIN
const db_egov = process.env.DB_USER
const db_simpeg = process.env.DB_SIMPEG

export const getDataUser = async (req, res) => {

    // console.log(req.body)

    var filterUnitKerja = ``
    
    if (req.body.id_unit_kerja) {
        filterUnitKerja = `AND (biodata.unit_kerja = '`+req.body.id_unit_kerja+`')`
    } else {
        filterUnitKerja = ``
    }

    const data = await getUser(req, res, filterUnitKerja)
    const jml = await getJmlUser(req, res, filterUnitKerja)
    
    // console.log(data)
    res.send({
        data : data.message,
        jml : Math.ceil((jml.message[0].jml)/req.body.dataLimit),
    });
    
}


export const getUser = async (req, res, filterUnitKerja)=>{
    // console.log("Controller getUser di panggil")
    // console.log(req.body)

    const limit = req.body.dataLimit
    const cari = req.body.searchData
    const startFrom = (req.body.pageFirst - 1)* limit;

    return new Promise((resolve, reject)=>{

        const query = `
        SELECT
        users.id as user_id,
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
    
        unit_kerja.unit_kerja unit_kerja,
        IFNULL(users_group.group_id, NULL) AS level,
        IFNULL(groupx.title, "No Access") AS level_title

    
        FROM `+db_egov+`.users users
    
        LEFT JOIN `+db_simpeg+`.biodata biodata
        ON biodata.nip = users.nama_nip
    
        LEFT JOIN `+db_simpeg+`.jabatan jabatan
        ON jabatan._id = biodata.jabatan
    
        LEFT JOIN `+db_simpeg+`.unit_kerja unit_kerja
        ON unit_kerja.id = jabatan.unit_kerja

        LEFT JOIN `+db_main+`.users_group users_group
        ON users_group.user_id = users.id

        LEFT JOIN `+db_main+`.\`group\` groupx
        ON groupx.id = users_group.group_id

        WHERE biodata.nama LIKE '%`+cari+`%' 
        `+filterUnitKerja+`
    
        LIMIT `+startFrom+`,`+limit+`
        `
        dbx.query(query, (err, rows) => {
            dbResolveCondition(resolve, err, rows)
        })
    })
    
}

export const getJmlUser = (req, res, filterUnitKerja) =>{


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
        `+filterUnitKerja+`
    
        `
        dbx.query(query, (err, rows) => {
            dbResolveCondition(resolve, err, rows)
        })
    })

}

export const updateAccount = async (req, res) => {

    console.log(req.body)

    await updateProfile(req, res);

    const userGroupLevel = await countUsersGroup(req, res);
    // console.log(userGroupLevel.message.length)
    if (userGroupLevel.message.length <= 0){
        await addUsersGroup(req, res)
        console.log("ADD")
        res.send("ADD GROUP")
    }else {
        await updateUsersGroup(req, res);
        console.log("UPDATE")
        res.send("UPDATE GROUP")
    }
        




}

export const updateProfile =  async (req, res) => {


    // console.log("UPDATE PROFILE DI PANGGIL")

    return new Promise((resolve, reject) => {
        
        const query = `
                UPDATE users
                SET
                username = '`+req.body.username+`',
                email = '`+req.body.email+`',
                hp = '`+req.body.hp+`'
                WHERE id = '`+req.body.user_id+`'
            `
        
            dbx.query(query, (err, rows)=>{
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(rows)
                }
            })
    })

    
}

export const countUsersGroup = async (req, res) => {

    return new Promise((resolve, reject) => {

        const query = `
            SELECT * FROM users_group
            WHERE users_group.user_id = '`+req.body.user_id+`'
        `

        db.query(query, (err, rows) => {
            dbResolveCondition(resolve, err, rows)
        })
    })

}

export const updateUsersGroup = async (req, res) => {

    return new Promise((resolve, reject) => {
        const query = `
            UPDATE users_group
            SET
            group_id = `+ req.body.level + `
            WHERE
            user_id = '`+ req.body.user_id + `'
        `

        db.query(query, (err, rows) => {
            dbResolveCondition(resolve, err, rows)
        })

    })

}

export const addUsersGroup = async (req, res) => {

    console.log(req.body)

    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO users_group (user_id, group_id) VALUES (?, ?);
        `
        const values = [
            req.body.user_id,
            req.body.level || 0
        ]

        db.query(query, values, (err, rows) => {
            dbResolveCondition(resolve, err, rows)
        })

    })
}



export const getProfile = async(req, res) =>{
    console.log("Controller getProfile user.js di panggil")
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
    console.log(nip)

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



