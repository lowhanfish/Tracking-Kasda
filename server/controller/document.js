import db from "../db/mysql/index.js";




export const view = (req, res) => {
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