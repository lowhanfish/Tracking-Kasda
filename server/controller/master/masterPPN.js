import db from "../../db/mysql/index.js";


export const all = (req, res) => {
    const query = `
        SELECT 
        master_ppn.id,
        master_ppn.id as value,
        master_ppn.uraian as label,
        master_ppn.nilai

        FROM master_ppn
    `
    db.query(query, (err, rows)=> {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(rows)
        }
    })
}


export const view = (req, res) => {
    const query = `
        SELECT * FROM master_ppn
    `
    db.query(query, (err, rows)=> {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(rows)
        }
    })
}
export const add = (req, res) => {
    const query = `
        INSERT INTO master_ppn (uraian, keterangan, nilai, createdAt, createdBy)
        VALUES (?,?,?,NOW(),?)
    `
    const values = [req.body.uraian, req.body.keterangan, req.body.nilai, req.user._id];

    db.query(query, values, (err, rows)=> {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(rows);
        }
    })


}
export const editex = (req, res) => {
    const query = `
        UPDATE master_ppn SET
        uraian = ?,
        keterangan = ?,
        nilai = ?

        WHERE id = ?
    `
    const values = [req.body.uraian, req.body.keterangan, req.body.nilai, req.body.id];

    db.query(query, values, (err, rows)=> {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(rows)
        }
    })
}
export const deletex = (req, res) => {
    
    const query = `
        DELETE FROM master_ppn
        WHERE id = ?
    `

    const values = [req.body.id];

    db.query(query, values, (err, rows)=> {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(rows);
        }
    })



}