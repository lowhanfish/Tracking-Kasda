import db from "../../db/mysql/index.js";



export const view = (req, res)=>{
    const query = `
        SELECT * FROM master_tahapan
    `

    db.query(query, (err, rows)=>{
        if (err){console.log(err)}
        else{res.send(rows)}
    })

}



export const add = (req, res) => {
   const query = `
    INSERT INTO master_tahapan (uraian, keterangan, createdAt, createdBy) VALUES (?,?,NOW(),?)
   `
   const values = [req.body.uraian, req.body.keterangan, req.user._id];
   db.query(query, values, (err, rows)=>{
    if (err) {
        console.log(err);
        res.status(500);
    }else{
        res.status(200);
        res.send(rows)
    }
   })
}



export const edit = (req, res) => {

    console.log(req.body)

    // Validasi input
    if (!req.body.id || !req.body.uraian) {
        return res.status(400).json({ message: "ID dan Uraian harus diisi" });
    }

    const query = `
        UPDATE master_tahapan SET 
        uraian = ?,
        keterangan = ?
        WHERE id = ?
    `;

    const values = [req.body.uraian, req.body.keterangan, req.body.id];

    db.query(query, values, (err, rows) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Error updating data", error: err });
        } else {
            res.status(200).json({ message: "Data updated successfully", data: rows });
        }
    });
}