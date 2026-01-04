import { Router } from "express";

import db from '../../db/mysql/index.js'
import { view as viewTracking } from "../../controller/tracking.js";
import { getBiodataByNIP } from "../../controller/master/biodata.js";

const db_main = process.env.DB_MAIN
const db_simpeg = process.env.DB_SIMPEG
const db_user = process.env.DB_USER


const router = Router();



router.post('/', (req, res)=> {
    const query = `
    
        SELECT 
        documents.id,
        documents.master_jns_pencairan_id,
        documents.uraian,
        documents.no,
        documents.pengusul,
        documents.createdAt,
        unit_kerja.unit_kerja as unit_kerja_uraian

        FROM ${db_main}.documents documents

        LEFT JOIN ${db_simpeg}.unit_kerja unit_kerja
        ON unit_kerja.id = documents.sub_unit_kerja

        WHERE documents.code = ?
    `;


    console.log(query)

    const values = [req.body.code]

    db.query(query, values, async (err, rows) => {
        if (err) {
            console.log(err)
            res.status(500).send(err);
        } else {

            
            for (let i = 0; i < rows.length; i++) {

                rows[i].tracking = await viewTracking(rows[i].id, rows[i].master_jns_pencairan_id)
                rows[i].pengusulObj = await getBiodataByNIP(rows[i].pengusul);
            }

            res.status(200).send(rows);
        }



    })




})





export default router





