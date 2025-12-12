import db from "../db/mysql/index.js";



export const view = (documents_id) => {

    return new Promise((resolve, reject) => {
        
        const query = `
            SELECT
            master_pph.*
            FROM pph
            LEFT JOIN master_pph
            ON master_pph.id = pph.master_pph_id
            WHERE pph.documents_id = ?
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


export const add = () => {
    
}



export const deletex = (documents_id) => {
    return new Promise((resolve, reject) => {
        const query = `
            DELETE pph
            WHERE pph.documents_id = ?
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