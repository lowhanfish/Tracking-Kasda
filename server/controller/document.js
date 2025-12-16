import db from "../db/mysql/index.js";
import { add as add_pph, view as view_pph, deletex as delete_pph } from "../controller/pph.js";
import { add as add_ppn, view as view_ppn, deletex as delete_ppn } from "../controller/ppn.js";
import {add as add_files, deletex as deletex_files, view as view_files } from "../controller/files.js";


export const view = (req, res) => {

    // console.log("View Document dipanggil");
    // res.send("OK")

    const query = `
        SELECT
        documents.*,
        master_jns_pencairan.uraian as uraian_jns_pencairan
        FROM documents

        LEFT JOIN master_jns_pencairan
        ON documents.master_jns_pencairan_id = master_jns_pencairan.id

    `

    db.query(query, async (err, rows)=>{
        if (err) {
            console.log(err);
            res.status(500).send(err)
        } else {
            
            for (let i = 0; i < rows.length; i++) {
                rows[i].ppn = await view_ppn(rows[i].id);
                rows[i].pph = await view_pph(rows[i].id);
                rows[i].files = await view_files(req, 'documents', rows[i].id);
            }
            res.status(200).send(rows)
        }
    })
}


export const add = (req, res) => {
    const query = `
        INSERT INTO documents
        (uraian, master_jns_pencairan_id, nilai, createdAt, createdBy)
        VALUES
        (?, ?, ?, NOW(), ?)
    `;
    const values = [req.body.uraian, req.body.master_jns_pencairan_id, req.body.nilai, req.user._id];

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
    console.log(req.body)
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


export const deletex = (req, res) => {

    // console.log(req.body)

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
            deletex_files(req, 'documents', req.body.id);
            res.status(200).send(rows)
        }
    })
}