import db from "../db/mysql/index.js";
import fs from 'fs'; 


export const insertFile = (filetitle, type, db_name, ref_id ) => {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO ref_id (title, type, db_name, ref_id)
            VALUES (?, ?, ?, ?)
        `
        const values = [filetitle, type, db_name, ref_id];
        db.query(query, values, (err, rows)=> {
            if (err) {
                reject({
                    status : 500,
                    message : err
                })
            } else {
                resolve({
                    status : 500,
                    message : rows
                })
            }
        })
    })
}


export const deleteFile = (db_name, ref_id) => {
    return new Promise((resolve, reject) => {
        const query = `
            DELETE FROM ref_file
            WHERE db_name = ? AND ref_id = ?
        `
        const values = [db_name, ref_id]
        db.query(query, values, (err, rows) => {
            if (err) {
                reject({
                    status : 500,
                    message : err
                })
            } else {
                resolve({
                    status : 500,
                    message : rows
                })
            }
        })
    })
}



export const removeFile = async (db_name, ref_id) => {
    try {
        const data = await getAllFile(db_name, ref_id);
        const filePath = './uploads/';

        if (data && data.length > 0) {
            
            data.forEach((element, i) => {
                const fullPath = filePath + element.file;

                // Cek apakah file fisik ada sebelum dihapus
                if (fs.existsSync(fullPath)) {
                    fs.unlink(fullPath, (err) => {
                        if (err) {
                            console.error(`Gagal menghapus file ${element.file}:`, err);
                            return;
                        }
                        console.log(`File ke-${i} (${element.file}) berhasil dihapus`);
                    });
                } else {
                    console.log(`File ${element.file} tidak ditemukan di folder, lewati.`);
                }
            });
        }
    } catch (error) {
        console.error("Error saat mengambil data file:", error);
    }
}

const getAllFile = (db_name, ref_id) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT * FROM file_ref
            WHERE db_name = ? AND ref_id = ? 
        `
        const values = [db_name, ref_id];

        db.query(query, values, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}