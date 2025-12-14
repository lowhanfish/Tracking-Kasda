import db from "../db/mysql/index.js";



export const view = (documents_id) => {

    return new Promise((resolve, reject) => {
        
        const query = `
            SELECT
            master_pph.id,
            master_pph.id as value,
            master_pph.uraian as label,
            master_pph.nilai
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
                resolve(rows)
            }
        })
    })
}


export const add = (pph, documents_id) => { 
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO pph
            (documents_id, master_pph_id)
            VALUES
            (?, ?)
        `
        const values = [documents_id, pph.id];

        db.query(query,values, (err, rows)=>{
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