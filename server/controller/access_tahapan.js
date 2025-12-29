import db from '../db/mysql/index.js'


export const addx = async (arr, group_id) => {

    for (let i = 0; i < arr.length; i++) {
        await insertData(arr[i], group_id)
    }
}


const insertData = (data, group_id) => {

    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO access_tahapan (group_id, master_tahapan_id, status)
            VALUES (?,?,?)
        `;
    
        const values = [group_id, data.id, data.status];
    
        db.query(query, values, (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })
        
    })

}