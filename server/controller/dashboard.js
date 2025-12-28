import db from '../db/mysql/index.js'

export const bar = (req, res)=> {

     

        const query = `
            SELECT
            COUNT(documents.id) as total,
            (
                SELECT
                COUNT (documentsx.id) as process 
                FROM documents documentsx
                WHERE documentsx.status_temp = 0 
            ) as proceess,
            (
                SELECT
                COUNT (documentsx.id) as process 
                FROM documents documentsx
                WHERE documentsx.status_temp = 1 
            ) as approve,
            (
                SELECT
                COUNT (documentsx.id) as process 
                FROM documents documentsx
                WHERE documentsx.status_temp = 2 
            ) as reject


            FROM documents
        `;
        const values = [];
        db.query(query, values, (err, rows)=> {
            if (err) {
                res.status(500).send(err);    
            } else {
                res.status(200).send(rows[0]);
            }
        }) 
}
export const frekwensi_pengajuan = (req, res)=> {
        const query = `
        
        `;
        const values = [];
        db.query(query, values, (err, rows)=> {
            if (err) {
                res.status(500).send(err);    
            } else {
                res.status(200).send(rows);
            }
        })
}
export const pie_status = (req, res)=> {
        const query = `
        
        `;
        const values = [];
        db.query(query, values, (err, rows)=> {
            if (err) {
                res.status(500).send(err);    
            } else {
                res.status(200).send(rows);
            }
        })
}
export const time_series_history = (req, res)=> {
        const query = `
        
        `;
        const values = [];
        db.query(query, values, (err, rows)=> {
            if (err) {
                res.status(500).send(err);    
            } else {
                res.status(200).send(rows);
            }
        })
}