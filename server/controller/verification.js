import db from "../db/mysql/index.js";

const main = process.env.DB_MAIN;
const simpeg = process.env.DB_SIMPEG;
const egov = process.env.DB_USER;


import { saveHistory, save as SaveTracking, getID } from "../controller/tracking.js";
import { FirstStep, NumNextStep, LastStep } from "../lib/getStep.js";
import {add as add_files} from "../controller/files.js";
import { dummyStatus, canUpdate } from "../controller/getStatus.js";

export const view = async (req, res)=>{

    console.log("view route verivication dipanggil");
    // console.log(req.body);
    // console.log("========")

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
            documents.* ,
            documents_tracking.status as status_tracking,
            master_jns_pencairan.uraian as uraian_jns_pencairan
    
            FROM ${main}.documents documents

            JOIN documents_tracking
            ON (documents_tracking.documents_id = documents.id AND documents_tracking.master_tahapan_id = ?)

            LEFT JOIN ${main}.master_jns_pencairan master_jns_pencairan
            ON documents.master_jns_pencairan_id = master_jns_pencairan.id

            WHERE documents.uraian LIKE '%`+cari+`%'
            `+filterUnitKerja+`

            LIMIT `+startFrom+`,`+limit+`
    
        `
    
        const values = [req.body.master_tahapan_id];
    
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

export const approve = async (req, res)=>{
    // console.log(req.body);

    const FirstStepx = parseInt(req.body.master_tahapan_id)
    const numNextStep = await NumNextStep(req.body.master_jns_pencairan_id, FirstStepx);
    const LastStepx = await LastStep(req.body.master_jns_pencairan_id, FirstStepx);

    // console.log("FirstStep : ", FirstStepx);
    // console.log("LastStep : ", LastStepx);

    const query = `
        UPDATE documents_tracking
        SET 
        status = ?,
        keterangan = ?
        WHERE
        master_tahapan_id = ?  AND documents_id = ? 
    `
    const values = [req.body.status, req.body.catatan, req.body.master_tahapan_id, req.body.id];

    db.query(query, values, async (err, rows)=> {
        if (err) {
            res.status(500).send(err)
        } else {

            let id_tracking =  await getID (req.body.master_tahapan_id, req.body.id);
            // console.log("ID TRACKING ========== ",id_tracking)

            if (req.files && Array.isArray(req.files) && req.files.length > 0) {
                await add_files(req, "documents_tracking", id_tracking);
            }

            if (req.body.approvePath === 'approve') {
                SaveTracking(req, numNextStep, req.body.id, 0, "Dokumen sedang diverifikasi")
                await canUpdate(req.body.id, 0);

                if (FirstStepx == LastStepx) {
                    // console.log("============= HARUSNYA SUDAH FINAL ==========")
                    await dummyStatus(req.body.id, 1);
                }

            }else{
                // console.log("di reject kan? ========")
                await dummyStatus(req.body.id, 2);
                await canUpdate(req.body.id, 1);
            }
            saveHistory(req, req.body.master_tahapan_id, req.body.id, req.body.status, req.body.catatan)
            res.status(200).send(rows)
        }
    })

    // res.send("OK")

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

    console.log("getAllStep verifivation.js dipanggil");
    // console.log(req.body);


    const query = `
        SELECT 
        master_tahapan.*,

        (
            SELECT COUNT(*) 
            FROM documents_tracking

            JOIN documents
            ON documents.id = documents_tracking.documents_id
            
            WHERE documents_tracking.master_tahapan_id = master_tahapan.id AND documents_tracking.status = ?
           
        ) as total
        FROM master_tahapan
    `
    const values = [req.body.status]


    db.query(query, values, (err, rows)=>{
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.status(200).send(rows);
        }
    })


}