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
export const pie_status = async (req, res)=> {
    
    const process = await getCountDataByStatus(req, 0);
    const approve = await getCountDataByStatus(req, 1);
    const reject = await getCountDataByStatus(req, 2);

    const data = [
        { id: 0, value: process[0].jml, label: 'Process' },
        { id: 1, value: approve[0].jml, label: 'Approve' },
        { id: 2, value: reject[0].jml, label: 'Reject' },
    ]

    res.send(data);



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



const getCountDataByStatus = (req, statusx) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT
            COUNT(documents.id) as jml
            FROM documents
            WHERE documents.status_temp = ?
        `
        const values = [statusx]

        db.query(query, values, (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })


    })
}