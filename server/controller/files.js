import {  } from "../db/mysql/index.js";




export const view = (req, db_name, ref_id) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT * FROM file_ref
            WHERE file_ref.db_name = ? AND file_ref.ref_id = ?
        `;
        const values = [db_name, ref_id];

        db.query(query, values, (err, rows)=>{
            if (err) {
                console.log(err);
                reject({
                    status : 500,
                    message : err
                })
            } else {
                resolve({
                    status : 200,
                    message : rows
                })
            }
        })
    })
}

export const add = (req, db_name, ref_id) => {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO file_ref
            (title, file, type, db_name, ref_id)
            VALUES 
            (?,?,?,?,?)
        `;
        const values = [req.body.title, req.file.filename,req.file.mimetype, db_name, ref_id];

        db.query(query, values, (err, rows)=>{
            if (err) {
                console.log(err);
                reject({
                    status : 500,
                    message : err
                })
            } else {
                resolve({
                    status : 200,
                    message : rows
                })
            }
        })
    })
}
export const deletex = (req, db_name, ref_id) => {
    return new Promise((resolve, reject) => {
        const query = `
            DELETE FROM file_ref
            WHERE db_name = ? AND ref_id =?
        `;
        const values = [db_name, ref_id];

        db.query(query, values, (err, rows)=>{
            if (err) {
                console.log(err);
                reject({
                    status : 500,
                    message : err
                })
            } else {
                resolve({
                    status : 200,
                    message : rows
                })
            }
        })
    })
}