import db from "../db/mysql/index.js";
import { view as view_pph, deletex as delete_pph } from "../controller/pph.js";
import { view as view_ppn, deletex as delete_ppn } from "../controller/ppn.js";



export const view = (req, res) => {
    const query = `
        SELECT
        document.*
        FROM document
    `

    db.query(async (err, rows)=>{
        if (err) {
            console.log(err);
            res.status(500).send(err)
        } else {
            
            for (let i = 0; i < rows.length; i++) {
                rows[i].ppn = await view_ppn(document.id);
                rows[i].pph = await view_pph(document.id);
            }
            
            res.status(200).send(rows)
        }
    })


}


export const add = (req, res) => {
    const query = `
        SELECT
        document.*
        FROM document
    
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


export const editex = (req, res) => {
    const query = `
        SELECT
        document.*
        FROM document
    
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