import db from "../db/mysql/index.js";
import { add as add_pph, view as view_pph, deletex as delete_pph } from "../controller/pph.js";
import { add as add_ppn, view as view_ppn, deletex as delete_ppn } from "../controller/ppn.js";
import {add as add_files, deletex as deletex_files, view as view_files } from "../controller/files.js";

import { view as view_tracking, save as save_tracking, deletex as deletex_tracking, updateAllReject } from "../controller/tracking.js";
import { dummyStatus, canUpdate } from "../controller/getStatus.js";
import { removeFile } from "../lib/fileRef.js";
import { FirstStep, NumNextStep } from "../lib/getStep.js";

import uniqid from "uniqid";

const db_main = process.env.DB_MAIN
const db_simpeg = process.env.DB_SIMPEG
const db_user = process.env.DB_USER

export const view = async (req, res) => {

    // console.log("View Document dipanggil");
    // res.send("OK")


    console.log("view route register dokumen dipanggil");
    // console.log(req.body);
    // console.log("========")

    var filterUnitKerja = ``
        
    if (req.body.id_unit_kerja) {
        filterUnitKerja = `AND (documents.sub_unit_kerja = '`+req.body.id_unit_kerja+`')`
    } else {
        filterUnitKerja = ``
    }

    const data = await viewAllData(req, res, filterUnitKerja)
    const jml = await viewJmlData(req, res, filterUnitKerja)
    
    // console.log(jml[0].jml)
    res.send({
        data : data,
        jml : Math.ceil((jml[0].jml)/req.body.dataLimit),
    });
    
}

export const viewAllData = async (req, res, filterUnitKerja)=> {

    const limit = req.body.dataLimit
    const cari = req.body.searchData
    const startFrom = (req.body.pageFirst - 1)* limit;

    return new Promise((resolve, reject) => {
        
        const query = `
        SELECT
        documents.*,
        master_jns_pencairan.uraian as uraian_jns_pencairan,
        s_unit_kerja.unit_kerja as sub_unit_kerja_uraian,
        IFNULL (biodata.nama, "") as nama_pengusul

        FROM ${db_main}.documents documents

        LEFT JOIN ${db_main}.master_jns_pencairan master_jns_pencairan
        ON documents.master_jns_pencairan_id = master_jns_pencairan.id

        LEFT JOIN ${db_simpeg}.unit_kerja s_unit_kerja
        ON s_unit_kerja.id = documents.sub_unit_kerja

        LEFT JOIN ${db_user}.users users
        ON users.id = documents.createdBy

        LEFT JOIN ${db_simpeg}.biodata biodata
        ON biodata.nip = users.nama_nip

        WHERE documents.uraian LIKE '%`+cari+`%' 
        `+filterUnitKerja+`

        LIMIT `+startFrom+`,`+limit+`
        
    `

    db.query(query, async (err, rows)=>{
        if (err) {
            console.log(err);
            // res.status(500).send(err)
            reject(reject);

        } else {
            
            for (let i = 0; i < rows.length; i++) {
                rows[i].ppn = await view_ppn(rows[i].id);
                rows[i].pph = await view_pph(rows[i].id);
                rows[i].files = await view_files(req, 'documents', rows[i].id);
            }

            resolve(rows);
            // res.status(200).send(rows)
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

        FROM ${db_main}.documents documents
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

export const viewOne = async (req, res) => {
        const query = `
        SELECT
        documents.*,
        master_jns_pencairan.uraian as uraian_jns_pencairan,
        s_unit_kerja.unit_kerja as sub_unit_kerja_uraian,
        IFNULL (biodata.nama, "") as nama_pengusul

        FROM ${db_main}.documents documents

        LEFT JOIN ${db_main}.master_jns_pencairan master_jns_pencairan
        ON documents.master_jns_pencairan_id = master_jns_pencairan.id

        LEFT JOIN ${db_simpeg}.unit_kerja s_unit_kerja
        ON s_unit_kerja.id = documents.sub_unit_kerja

        LEFT JOIN ${db_user}.users users
        ON users.id = documents.createdBy

        LEFT JOIN ${db_simpeg}.biodata biodata
        ON biodata.nip = users.nama_nip

        WHERE documents.id = ?
    `

    const values = [req.body.id];

    db.query(query,values, async (err, rows)=>{
        if (err) {
            console.log(err);
            // res.status(500).send(err)
            res.status(500).send(err);

        } else {
            
            for (let i = 0; i < rows.length; i++) {
                rows[i].tracking = await view_tracking(rows[i].id, rows[i].master_jns_pencairan_id);
                rows[i].ppn = await view_ppn(rows[i].id);
                rows[i].pph = await view_pph(rows[i].id);
                rows[i].files = await view_files(req, 'documents', rows[i].id);
            }

            res.status(200).send(rows);
        }


    })
    
}

export const add = async (req, res) => {

    const query = `
        INSERT INTO documents
        (uraian, master_jns_pencairan_id, nilai, sub_unit_kerja, createdAt, createdBy, code)
        VALUES
        (?, ?, ?, ?, NOW(), ?, ?)
    `;
    const values = [req.body.uraian, req.body.master_jns_pencairan_id, req.body.nilai, req.body.sub_unit_kerja, req.user._id, uniqid()];

    db.query(query, values, async (err, rows)=>{
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }

        try {
            const documentId = rows.insertId;

            // Handle file uploads (boleh kosong)
            if (req.files && Array.isArray(req.files) && req.files.length > 0) {
                await add_files(req, "documents", documentId);
            }

            // Handle PPH data (boleh kosong)
            if (req.body.pph && Array.isArray(req.body.pph) && req.body.pph.length > 0) {
                for (let i = 0; i < req.body.pph.length; i++) {
                    await add_pph(req.body.pph[i], documentId);
                }
            }

            // Handle PPN data (boleh kosong)
            if (req.body.ppn && Array.isArray(req.body.ppn) && req.body.ppn.length > 0) {
                for (let i = 0; i < req.body.ppn.length; i++) {
                    await add_ppn(req.body.ppn[i], documentId);
                }
            }


            // console.log(req.body);
            const FirstStepx = await FirstStep(req.body.master_jns_pencairan_id)
            const numNextStep = await NumNextStep(req.body.master_jns_pencairan_id, FirstStepx);
            console.log("====================")
            console.log("FirstStepx", FirstStepx);
            console.log("numNextStep", numNextStep);
            console.log("==================== CLEAR")


            await save_tracking(req, req.body.master_tahapan_id, rows.insertId, 1, "Dokumen telah diregistrasi");
            
            if (numNextStep) {
                await save_tracking(req, numNextStep, rows.insertId, 0, "Dokumen sedang diverifikasi");
            }

            res.status(201).send({
                status: 201,
                message: 'Data berhasil disimpan',
                insertId: documentId,
                data: rows
            });
        } catch (error) {
            console.error('Error saat menyimpan data:', error);
            res.status(500).send({
                status: 500,
                message: 'Gagal menyimpan data',
                error: error.message
            });
        }
    })
}

export const editex = (req, res) => {
    console.log("FUNC EDIT REG DOK DI PANGGIL");
    // console.log(req.body)
    const query = `
        UPDATE documents SET
        uraian = ?,
        master_jns_pencairan_id = ?,
        nilai = ?

        WHERE id = ?
    `
    const values = [req.body.uraian, req.body.master_jns_pencairan_id, req.body.nilai, req.body.id];

    db.query(query, values, async (err, rows)=>{
        if (err) {
            console.log(err);
            res.status(500).send(err)
        } else {

            await delete_pph(req.body.id);
            await delete_ppn(req.body.id);

            await updateAllReject(req.body.id);
            await dummyStatus(req.body.id, 0);
            await canUpdate(req.body.id, 1);

            if (req.files && Array.isArray(req.files) && req.files.length > 0) {
                await add_files(req, "documents", req.body.id);
            }

            // Handle PPH data (boleh kosong)
            if (req.body.pph && Array.isArray(req.body.pph) && req.body.pph.length > 0) {
                for (let i = 0; i < req.body.pph.length; i++) {
                    await add_pph(req.body.pph[i], req.body.id);
                }
            }

            // Handle PPN data (boleh kosong)
            if (req.body.ppn && Array.isArray(req.body.ppn) && req.body.ppn.length > 0) {
                for (let i = 0; i < req.body.ppn.length; i++) {
                    await add_ppn(req.body.ppn[i], req.body.id);
                }
            }





            res.status(200).send(rows)
        }
    })
}

export const deletex = async (req, res) => {

    // console.log(req.body)

    await removeFile('documents', req.body.id);

    const query = `
        DELETE FROM documents
        WHERE id = ?
    `
    const values = [req.body.id];

    db.query(query, values, async (err, rows)=> {
        if (err) {
            res.status(500).send(err);
        } else {
            await delete_pph(req.body.id);
            await delete_ppn(req.body.id);
            await deletex_tracking(req.body.id);
            deletex_files(req, 'documents', req.body.id);
            res.status(200).send(rows)
        }
    })
}