import db from "../../db/mysql/index.js";



export const all = (req, res) => {

    console.log("all di panggil")
    
    const query = `SELECT 
    master_jns_pencairan.id,
    master_jns_pencairan.id as value,
    master_jns_pencairan.uraian as label
    FROM master_jns_pencairan
    `
    db.query(query, async (err, rows)=> {
        if (err) {
            console.log(err)
            res.status(500);
            res.send(err);
        } else {
            res.status(200)
            res.send(rows)

        }
    })

}

export const view = (req, res) => {

    // console.log("view di panggil")
    
    const query = `SELECT * FROM master_jns_pencairan`
    db.query(query, async (err, rows)=> {
        if (err) {
            res.status(500);
            res.send(err);
        } else {
            
            for (let i = 0; i < rows.length; i++) {
                rows[i].list = await view_master_jns_pencairan_list(rows[i]);
            }
            // console.log(rows);

            res.status(200)
            res.send(rows)

        }
    })

}
export const add = async (req, res) => {
    // console.log(req.body);

    const formData = req.body.formData
    const tahapanData = req.body.tahapanData
    const insertFormData = await insert_master_jns_pencairan(formData, req)
    console.log(insertFormData);

    for (let i = 0; i < tahapanData.length; i++) {
        if (tahapanData[i].statusx == 1) {
            await insert_master_jns_pencairan_list(tahapanData[i], insertFormData)
        }
    }

    res.send(200);
}

export const editex = (req, res) => {

    console.log("EDIT masterJnsPencairan di panggil")

    console.log(req.body);
    const formData = req.body.formData
    const tahapanData = req.body.tahapanData

    const query = `
        UPDATE master_jns_pencairan SET 
            uraian = ?,
            keterangan = ?
        WHERE id = ?
    `
    const values = [formData.uraian, formData.keterangan, formData.id];

    db.query(query, values, async (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500);
            res.send(err);
        } else {

            await remove_master_jns_pencairan_list(formData);
            for (let i = 0; i < tahapanData.length; i++) {
                if (tahapanData[i].statusx == 1) {
                    await insert_master_jns_pencairan_list(tahapanData[i], formData.id);
                }
            }

            res.status(200).send(rows);
        }
    })

  



}


export const deletex = (req, res) => {
    
    const query = `
        DELETE FROM master_jns_pencairan
        WHERE id = ?
    `
    const values = [req.body.id];

    db.query(query, values,  async (err, rows)=> {
        if (err) {
            // console.log(err)
            res.status(500);
            res.send(err);
        } else {
            await remove_master_jns_pencairan_list(req.body);
            res.status(200);
            res.send("OK");
        }
    })
}

const insert_master_jns_pencairan = (data, req) => {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO master_jns_pencairan (uraian, keterangan, createdAt, createdBy)
            VALUES (?,?, NOW(),?)
        
        `
        const values = [data.uraian, data.keterangan, req.user._id]


        db.query(query, values, (err, rows)=> {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                // console.log(rows);
                resolve(rows.insertId);
            }
        })
    })
}


const insert_master_jns_pencairan_list = (data, formId) => {
    return new Promise((resolve, reject) => {

        const query = `
            INSERT INTO master_jns_pencairan_list (
                master_tahapan_id, master_jns_pencairan_id, urut
            ) VALUES (?,?,?)
        `

        const values = [
            data.id, formId, data.urut
        ]
        
        db.query(query, values, (err, rows)=> {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(rows)
            }
        })


    })
}



const view_master_jns_pencairan_list = (data) => {

    return new Promise((resolve, reject) => {
        const values = [data.id];
        const query = `
            SELECT 
            master_tahapan.id,
            master_tahapan.uraian,
            IF(master_jns_pencairan_list.master_tahapan_id IS NOT NULL, TRUE, FALSE) as statusx,
            IFNULL(master_jns_pencairan_list.urut, 0) as urut

            FROM master_tahapan
            LEFT JOIN master_jns_pencairan_list
            ON 
            (
            master_tahapan.id = master_jns_pencairan_list.master_tahapan_id
            AND
            master_jns_pencairan_list.master_jns_pencairan_id = ?)
        `
        db.query(query, values,(err, rows)=> {

            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(rows);
            }
        })
    })
}



const remove_master_jns_pencairan_list = (data) => {

    return new Promise((resolve, reject) => {
        
        const query = `
            DELETE FROM master_jns_pencairan_list
            WHERE master_jns_pencairan_id = ?
        `
        const values = [data.id]
    
        db.query(query, values, (err, rows)=>{
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })
    })

}