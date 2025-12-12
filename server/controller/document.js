import db from "../db/mysql/index.js";
import { add as add_pph, view as view_pph, deletex as delete_pph } from "../controller/pph.js";
import { add as add_ppn, view as view_ppn, deletex as delete_ppn } from "../controller/ppn.js";
import {add as add_files, deletex as deletex_files, view as view_files } from "../controller/files.js";


export const view = (req, res) => {
    const query = `
        SELECT
        documents.*
        FROM documents
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
            res.status(500).send(err)
        } else {

            const files = req.files
            for (let i = 0; i < files.length; i++) {
                await add_files(req, "documents", rows.insertId);
            }

            const pph = req.body.pph
            for (let i = 0; i < pph.length; i++) {
                await add_pph(pph[i], rows.insertId)
            }
            const ppn = req.body.ppn
            for (let i = 0; i < pph.length; i++) {
                await add_ppn(ppn[i], rows.insertId)
            }

            res.status(200).send(rows)
        }
    })
}


export const editex = (req, res) => {
    const query = `
        SELECT
        documents.*
        FROM documents
    
    `

    db.query((err, rows)=>{
        if (err) {
            console.log(err);
            res.status(500).send(err)
        } else {
            res.status(200).send(rows)
        }
    })
}