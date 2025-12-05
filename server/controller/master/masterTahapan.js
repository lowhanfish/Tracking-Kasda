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
        console.log(err)
    }else{
        res.send(rows)
    }
   })
}