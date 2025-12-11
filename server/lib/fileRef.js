import db from "../db/mysql/index.js";



export const insertFile = (filetitle, type, db_name, ref_id ) => {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO ref_id (title, type, db_name, ref_id)
            VALUES (?, ?, ?, ?)
        `
        const values = [filetitle, type, db_name, ref_id];
        db.query(query, values, (err, rows)=> {
            if (err) {
                reject({
                    status : 500,
                    message : err
                })
            } else {
                resolve({
                    status : 500,
                    message : rows
                })
            }
        })
    })
}


export const deleteFile = (db_name, ref_id) => {
    return new Promise((resolve, reject) => {
        const query = `
            DELETE FROM ref_file
            WHERE db_name = ? AND ref_id = ?
        `
        const values = [db_name, ref_id]
        db.query(query, values, (err, rows) => {
            if (err) {
                reject({
                    status : 500,
                    message : err
                })
            } else {
                resolve({
                    status : 500,
                    message : rows
                })
            }
        })
    })
}