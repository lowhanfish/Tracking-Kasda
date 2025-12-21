import db from "../db/mysql/index.js";
import db_egov from "../db/mysql/egov.js";
import db_simpeg from "../db/mysql/simpeg.js";



export const view = (req, res)=>{
    const query = `
        SELECT 
        documents.* 

        FROM ${db}.documents documents

        JOIN ${db}.master_jns_pencairan master_jns_pencairan
        ON documents.master_jns_pencairan_id = master_jns_pencairan.id

        JOIN ${db}.master_jns_pencairan_list master_jns_pencairan_list
        ON master_jns_pencairan_list.master_jns_pencairan_id = master_jns_pencairan.id

    `


    db.query((err, rows)=>{
        if (err) {
            res.status(500).send("OK");
        } else {
            res.status(200).send(rows);
        }

    })





}
export const verification = (req, res)=>{
    res.status(200).send("OK");
}
export const reject = (req, res)=>{
    res.status(200).send("OK");
}