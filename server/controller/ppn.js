import db from "../db/mysql/index.js";



export const view = (documents_id) => {

    return new Promise((resolve, reject) => {
        
        const query = `
            SELECT
            master_ppn.*
            FROM ppn
            LEFT JOIN master_ppn
            ON master_ppn.id = ppn.master_ppn_id
            WHERE ppn.documents_id = ?
        `
        const values = [documents_id];
    
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
export const deletex = (documents_id) => {
    return new Promise((resolve, reject) => {
        const query = `
            DELETE ppn
            WHERE ppn.documents_id = ?
        `
        const values = [documents_id];
    
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