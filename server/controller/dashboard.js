import db from '../db/mysql/index.js'
const main = process.env.DB_MAIN;
const simpeg = process.env.DB_SIMPEG;
const egov = process.env.DB_USER;
import { view as view_tracking} from "../controller/tracking.js";

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
export const list_documents = (req, res)=> {

        var filter_sub_unit_kerja = ''

        if (req.body.unit_kerja) {
            filter_sub_unit_kerja = `WHERE  documents.sub_unit_kerja = `+req.body.unit_kerja+``
        } else {
            filter_sub_unit_kerja = ''
        }


         const query = `
            SELECT 
            documents.* ,
            master_jns_pencairan.uraian as uraian_jns_pencairan,
            s_unit_kerja.unit_kerja as sub_unit_kerja_uraian
    
            FROM ${main}.documents documents

            LEFT JOIN ${main}.master_jns_pencairan master_jns_pencairan
            ON documents.master_jns_pencairan_id = master_jns_pencairan.id

            LEFT JOIN ${simpeg}.unit_kerja s_unit_kerja
            ON s_unit_kerja.id = documents.sub_unit_kerja

            ${filter_sub_unit_kerja}
            LIMIT `+req.body.limit+`
    
        `
    
        const values = [req.body.master_tahapan_id];
        db.query(query, values, (err, rows)=> {
            if (err) {
                console.log(err);
                res.status(500).send(err);    
            } else {
                res.status(200).send(rows);
            }
        })
}

export const getProgressByIdDoc = async (req, res)=> {
    // console.log(req.body);

    // res.send("Dari getProgressByIdDoc")
    const data = await view_tracking(req.body.id, req.body.master_jns_pencairan_id);
    res.send(data);


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



