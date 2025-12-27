import db from "../db/mysql/index.js";

const db_main = process.env.DB_MAIN
const db_simpeg = process.env.DB_SIMPEG
const db_user = process.env.DB_USER

export const view = (documents_id, master_jns_pencairan_id, )=>{
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
            master_jns_pencairan_list.id,
            master_jns_pencairan_list.master_jns_pencairan_id,
            master_jns_pencairan_list.master_tahapan_id,
            master_jns_pencairan_list.urut,
            master_tahapan.uraian as master_tahapan_uraian,
            IFNULL (documents_tracking.status, 0) as status,
            IFNULL (documents_tracking.keterangan, '-') as keterangan,
            IFNULL (documents_tracking.createdAT, '') as createdAt,
            IFNULL (biodata.nama, "") as nama_pengusul

            FROM ${db_main}.master_jns_pencairan_list master_jns_pencairan_list
            
            LEFT JOIN ${db_main}.master_tahapan master_tahapan
            ON master_tahapan.id = master_jns_pencairan_list.master_tahapan_id

            LEFT JOIN ${db_main}.documents_tracking documents_tracking
            ON documents_tracking.master_tahapan_id = master_tahapan.id
            AND documents_tracking.documents_id = ?

            LEFT JOIN ${db_user}.users users
            ON users.id = documents_tracking.createdBy

            LEFT JOIN ${db_simpeg}.biodata biodata
            ON biodata.nip = users.nama_nip

            WHERE
            master_jns_pencairan_list.master_jns_pencairan_id = ?

            ORDER BY master_jns_pencairan_list.urut
        `
        const values = [documents_id, master_jns_pencairan_id];

        db.query(query, values, (err, rows)=>{
            if (err) {
                console.log(err);
                reject({
                    status : 500,
                    message : err
                })
            } else {
                resolve(rows)
            }
        })
    })
}

export const save = (req, master_tahapan_id, documents_id, status, keterangan) => {

    return new Promise(async (resolve) => {
        const jml = await viewLength(master_tahapan_id, documents_id)
        if (jml <= 0) {
            await add(req, master_tahapan_id, documents_id, status, keterangan);
            resolve("OK");
        } else {
            await editex(req, master_tahapan_id, documents_id, status, keterangan);
            resolve("OK");
        }
    })    
}
export const saveHistory = (req, master_tahapan_id, documents_id, status, keterangan) => {

   return new Promise((resolve, reject) => {

    const query = `
            INSERT 
            INTO documents_history
            (master_tahapan_id, documents_id, createdBy, status, keterangan, createdAt)
            VALUES
            (?, ?, ?, ?, ?, NOW())
        `

        const values = [master_tahapan_id, documents_id, req.user._id, status, keterangan];

        db.query(query, values, (err, rows)=>{
            if (err) {
                console.log(err);
                reject({
                    status: 500,
                    message: err
                });
            } else {
                resolve(rows);
            }
        })
    
   })
}

export const viewLength = (master_tahapan_id, documents_id) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT COUNT(*) as count
            FROM documents_tracking
            WHERE master_tahapan_id = ? AND documents_id = ?
        `
        const values = [master_tahapan_id, documents_id];

        db.query(query, values, (err, rows) => {
            if (err) {
                console.log(err);
                reject({
                    status: 500,
                    message: err
                });
            } else {
                resolve(rows[0].count);
            }
        });
    });
}

export const add = (req, master_tahapan_id, documents_id, status, keterangan) => {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT 
            INTO documents_tracking
            (master_tahapan_id, documents_id, createdBy, status, keterangan, createdAt)
            VALUES
            (?, ?, ?, ?, ?, NOW())
        `

        const values = [master_tahapan_id, documents_id, req.user._id, status, keterangan];

        db.query(query, values, (err, rows)=>{
            if (err) {
                console.log(err);
                reject({
                    status: 500,
                    message: err
                });
            } else {
                resolve(rows);
            }
        })
    })
}

export const editex = (req, master_tahapan_id, documents_id, status, keterangan) => {
    return new Promise((resolve, reject) => {
        const query = `
            UPDATE documents_tracking SET
            status = ?,
            keterangan = ?
            WHERE master_tahapan_id = ? AND documents_id = ?
        `

        const values = [status, master_tahapan_id, documents_id, keterangan];

        db.query(query, values, (err, rows)=>{
            if (err) {
                console.log(err);
                reject({
                    status: 500,
                    message: err
                });
            } else {
                resolve(rows);
            }
        })
    })
}

export const deletex = (documents_id) => {
    return new Promise((resolve, reject) => {
        const query = `
                DELETE FROM documents_tracking
                WHERE documents_tracking.documents_id = ?
        `;

        const values = [documents_id];
        db.query(query, values, (err, rows)=> {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    })
}


export const getID = (master_tahapan_id, documents_id) => {
    return new Promise((resolve, reject) => {
        
        const query = `
            SELECT id FROM documents_tracking
            WHERE master_tahapan_id = ? AND documents_id = ?
        `;

        const values = [master_tahapan_id, documents_id];

        db.query(query, values, (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows[0].id)
            }
        })




    })
}