import db from "../db/mysql/index.js";

const main = process.env.DB_MAIN;
const simpeg = process.env.DB_SIMPEG;
const egov = process.env.DB_USER;


export const view = async (req, res)=>{

    console.log("view route verivication dipanggil");
    console.log(req.body);
    console.log("========")

    var filterUnitKerja = ``
        
    if (req.body.id_unit_kerja) {
        filterUnitKerja = `AND (documents.sub_unit_kerja = '`+req.body.id_unit_kerja+`')`
    } else {
        filterUnitKerja = ``
    }

    const data = await viewAllData(req, res,filterUnitKerja);
    const jml = await viewJmlData(req, res, filterUnitKerja)



    res.send({
        data : data,
        jml : 5,
    });
}

export const viewAllData = (req, res, filterUnitKerja)=>{


    const limit = req.body.dataLimit
    const cari = req.body.searchData
    const startFrom = (req.body.pageFirst - 1)* limit;


    return new Promise((resolve, reject) => {
        

        const query = `
            SELECT 
            documents.* 
    
            FROM ${main}.documents documents

            WHERE documents.uraian LIKE '%`+cari+`%' 
            `+filterUnitKerja+`

            LIMIT `+startFrom+`,`+limit+`
    
           
    
        `
    
        const values = [6];
    
        db.query(query, values, (err, rows)=>{
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
    
        })


    })

}

export const viewJmlData = async (req, res, filterUnitKerja)=> {
    const cari = req.body.searchData
    return new Promise((resolve, reject)=>{

        const query = `
        SELECT
        
        count(documents.id) as jml

        FROM ${main}.documents documents
        WHERE documents.uraian LIKE '%`+cari+`%' 
        `+filterUnitKerja+`
        `
        db.query(query, (err, rows) => {
            if (err) {
                console.log(err);
                reject({
                    status :500,
                    message : err
                })
            } else {
                resolve(rows)
            }
        })
    })

}

export const verification = (req, res)=>{
    const query = `
        UPDATE documents_tracking
        SET 
        status = ?,
        keterangan = ?
        WHERE
        master_tahapan_id = ?  AND documents_id = ? 

    `
    const values = [req.body.status, req.body.keterangan, req.body.master_tahapan_id, req.body.id];


    db.query(query, values, (err, rows)=> {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(rows)
        }
    })



}
export const reject = (req, res)=>{
    res.status(200).send("OK");
}




/*
Di panggil di :
Fungsi ini peruntukan untuk list tahapan berdasarkan role akses verifikasi
- API/documents
*/

export const getAllStep = (req, res) => {
    const query = `
        SELECT 
        master_tahapan.*,

        (
            SELECT COUNT(*) 
            FROM documents_tracking
            
           

            WHERE documents_tracking.master_tahapan_id = master_tahapan.id
           


        ) as total


        FROM master_tahapan


    `
    db.query(query, (err, rows)=>{
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.status(200).send(rows);
        }
    })


}