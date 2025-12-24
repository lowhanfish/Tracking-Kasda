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
    res.status(200).send("OK");
}
export const reject = (req, res)=>{
    res.status(200).send("OK");
}


export const getAllBarStep = () => {
    const query = `
    
    `

    const values = [];

    db.query(query, values, (err, rows)=> {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(rows)
        }
    })


}