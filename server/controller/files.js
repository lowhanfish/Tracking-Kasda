import db from "../db/mysql/index.js";


export const view = (req, db_name, ref_id) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT * FROM file_ref
            WHERE file_ref.db_name = ? AND file_ref.ref_id = ?
        `;
        const values = [db_name, ref_id];

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

export const add = (req, db_name, ref_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Handle multiple files dari upload.array()
            if (!req.files || req.files.length === 0) {
                return reject({
                    status: 400,
                    message: 'No files uploaded'
                });
            }

            const promises = req.files.map((file) => {
                return new Promise((resolveFile, rejectFile) => {
                    const query = `
                        INSERT INTO file_ref
                        (title, file, type, db_name, ref_id)
                        VALUES 
                        (?,?,?,?,?)
                    `;
                    const values = [file.originalname, file.filename, file.mimetype, db_name, ref_id];

                    db.query(query, values, (err, rows) => {
                        if (err) {
                            console.log(err);
                            rejectFile(err);
                        } else {
                            resolveFile({
                                status: 200,
                                insertId: rows.insertId,
                                filename: file.filename,
                                originalname: file.originalname
                            });
                        }
                    });
                });
            });

            const results = await Promise.all(promises);
            
            resolve({
                status: 200,
                message: 'Files uploaded successfully',
                files: results
            });
        } catch (error) {
            console.log(error);
            reject({
                status: 500,
                message: error.message
            });
        }
    });
}
export const deletex = (req, db_name, ref_id) => {
    return new Promise((resolve, reject) => {
        const query = `
            DELETE FROM file_ref
            WHERE db_name = ? AND ref_id =?
        `;
        const values = [db_name, ref_id];

        db.query(query, values, (err, rows)=>{
            if (err) {
                console.log(err);
                reject({
                    status : 500,
                    message : err
                })
            } else {
                resolve({
                    status : 200,
                    message : rows
                })
            }
        })
    })
}