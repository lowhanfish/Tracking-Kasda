import db from "../db/mysql/index.js";




export const canUpdate = (documents_id, statusx)=> {
    return new Promise((resolve, reject) => {
        const query = `
            UPDATE documents
            SET
            status_update = ?
            WHERE id =?
        `;
        const values = [statusx, documents_id];
        db.query(query, values, (err, rows)=> {
            if (err){
                reject(err)
            }else{
                resolve(rows)
            }
        })
    })
}


export const dummyStatus = (documents_id, statusx) => {
    return new Promise((resolve, reject) => {
        const query = `
            UPDATE documents
            SET
            status_temp = ?
            WHERE id =?
        `;
        const values = [statusx, documents_id];
        db.query(query, values, (err, rows)=> {
            if (err){
                reject(err)
            }else{
                resolve(rows)
            }
        })
    })
}



