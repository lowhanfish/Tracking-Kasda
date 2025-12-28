import db from '../db/mysql/index.js'

export const bar = ()=> {
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
export const frekwensi_pengajuan = ()=> {
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
export const pie_status = ()=> {
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
export const time_series_history = ()=> {
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