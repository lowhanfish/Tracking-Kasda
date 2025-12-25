import db from "../db/mysql/index.js";


export const NumNextStep = async (master_jns_pencairan) => {
    const datax = await getSteps(master_jns_pencairan)
    const dataindex = datax.findIndex(item => item.urut === master_jns_pencairan)
    return dataindex
}
export const NumBackStep = async (master_jns_pencairan) => {
    const datax = await getSteps(master_jns_pencairan)
    const dataindex = datax.findIndex(item => item.urut === master_jns_pencairan)
    return dataindex
}


const getSteps = (master_jns_pencairan) => {

    return new Promise((resolve, reject) => {
        
        const query = `
            SELECT id FROM master_jns_pencairan_list
            WHERE master_jns_pencairan_list.master_jns_pencairan_id = ?
        `;
    
        const values = [master_jns_pencairan];

        db.query(query, values, (err, rows)=>{

            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        })

    })




}