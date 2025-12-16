import db from "../../db/mysql/index.js";


/*
    dipanggil di :
    1. masterJnsPencairan.
*/
export const viewbool = (req,res) => {
    const query = `
        SELECT 
        master_tahapan.id,
        master_tahapan.uraian,
        false AS statusx
        FROM master_tahapan
    `
    db.query(query, (err, rows)=>{
        if (err){console.log(err)}
        else{res.send(rows)}
    })
}

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

export const editex = (req, res) => {
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

export const deletex = (req, res)=> {
    // Validasi input
    if (!req.body.id) {
        return res.status(400).json({message: "ID harus diisi"});
    }

    const query = `
        DELETE FROM master_tahapan
        WHERE id = ?
    `
    const values = [req.body.id];

    db.query(query, values, (err, rows)=>{
        if (err) {
            return res.status(500).json({message: "Delete data gagal", error:err});
        } else if (rows.affectedRows === 0) {
            return res.status(404).json({message: "Data yang akan dihapus tidak ditemukan"});
        } else {
            res.status(200).json({message:"Delete data sukses", data:rows});
        }
    })
}

export const viewRelate = (documents_id, master_jns_pencairan_id, )=>{
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
            master_jns_pencairan_list.id,
            master_jns_pencairan_list.master_jns_pencairan_id,
            master_jns_pencairan_list.master_tahapan_id,
            master_jns_pencairan_list.urut,
            master_tahapan.uraian as master_tahapan_uraian,
            IFNULL (documents_tracking.status, 0) as status,
            IFNULL (documents_tracking.keterangan, '-') as keterangan

            FROM master_jns_pencairan_list master_jns_pencairan_list
            
            LEFT JOIN master_tahapan master_tahapan
            ON master_tahapan.id = master_jns_pencairan_list.master_tahapan_id

            LEFT JOIN documents_tracking documents_tracking
            ON documents_tracking.master_tahapan_id = master_tahapan.id
            AND documents_tracking.documents_id = ?

            WHERE
            master_jns_pencairan_list.master_jns_pencairan_id = ?

            ORDER BY master_jns_pencairan_list.urut
        `
        const values = [documents_id, master_jns_pencairan_id];

        db.query(query, values, (err, rows)=>{
            if (err) {
                console.log(err);
                reject({
                    status : 500,
                    message : err
                })
            } else {
                resolve(rows)
            }
        })



    })
}