import db from "../db/mysql/index.js";

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
            IFNULL (documents_tracking.keterangan, '-') as keterangan

            FROM master_jns_pencairan_list master_jns_pencairan_list
            
            LEFT JOIN master_tahapan master_tahapan
            ON master_tahapan.id = master_jns_pencairan_list.master_tahapan_id

            LEFT JOIN documents_tracking documents_tracking
            ON documents_tracking.master_tahapan_id = master_tahapan.id
            AND documents_tracking.documents_id = ?

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



export const save = () => {
    return new Promise((resolve, reject) => {
        
    })    
}
export const viewLength = (req, master_tahapan_id, documents_id) => {
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

        db.query(query, values, ()=>{
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