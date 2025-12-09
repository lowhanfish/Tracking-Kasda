import db from "../../db/mysql/index.js";



export const view = (req, res) => {

    console.log("view di panggil")
    
    const query = `SELECT * FROM master_jns_pencairan`
    db.query(query, async (err, rows)=> {
        if (err) {
            res.status(500);
            res.send(err);
        } else {
            
            for (let i = 0; i < rows.length; i++) {
                rows[i].list = await view_master_jns_pencairan_list(rows[i]);
            }
            

            console.log(rows);

            res.status(200)
            res.send(rows)

        }
    })

}
export const add = async (req, res) => {
    console.log(req.body);

    const formData = req.body.formData
    const tahapanData = req.body.tahapanData
    const insertFormData = await insert_master_jns_pencairan(formData, req)
    console.log(insertFormData);

    for (let i = 0; i < tahapanData.length; i++) {
        if (tahapanData[i].id) {
            await insert_master_jns_pencairan_list(tahapanData[i], insertFormData)
        }
    }

    res.send(200);
}

export const editex = (req, res) => {
    res.send(200);
}
export const deletex = (req, res) => {
    res.send(200);
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