import db from "../db/mysql/index.js";

const main = process.env.DB_MAIN;
const simpeg = process.env.DB_SIMPEG;
const egov = process.env.DB_USER;


export const view = (req, res)=>{
    const query = `
        SELECT 
        documents.* 

        FROM ${main}.documents documents

        LEFT JOIN ${main}.master_jns_pencairan master_jns_pencairan
        ON documents.master_jns_pencairan_id = master_jns_pencairan.id

        LEFT JOIN ${main}.master_jns_pencairan_list master_jns_pencairan_list
        ON master_jns_pencairan_list.master_jns_pencairan_id = master_jns_pencairan.id

        WHERE master_jns_pencairan_list.id = ?

    `

    const values = [6];

    db.query(query, values, (err, rows)=>{
        if (err) {
            console.log(err)
            res.status(500).send(err);
        } else {
            res.status(200).send(rows);
        }

    })
}

export const verification = (req, res)=>{
    const query = `
        UPDATE documents_tracking
        SET 
        status = ?,
        keterangan = ?
        WHERE
        master_tahapan_id = ?  AND documents_id = ? 

    `
    const values = [req.body.status, req.body.keterangan, req.body.master_tahapan_id, req.body.id];


    db.query(query, values, (err, rows)=> {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(rows)
        }
    })



}
export const reject = (req, res)=>{
    res.status(200).send("OK");
}




/*
Di panggil di :
Fungsi ini peruntukan untuk list tahapan berdasarkan role akses verifikasi
- API/documents
*/

export const getAllStep = (req, res) => {
    const query = `
        SELECT 
        master_tahapan.*,

        (
            SELECT COUNT(*) 
            FROM documents_tracking
            
           

            WHERE documents_tracking.master_tahapan_id = master_tahapan.id
           


        ) as total


        FROM master_tahapan


    `
    db.query(query, (err, rows)=>{
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.status(200).send(rows);
        }
    })


}