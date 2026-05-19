import db from "../db/mysql/index.js";


export const NumNextStep = async (master_jns_pencairan, currentData) => {

    console.log("currentData :"+ currentData)
    console.log("master_jns_pencairan :"+ master_jns_pencairan)
    const datax = await getSteps(master_jns_pencairan);

    console.log("datax = ")
    console.log(datax);


    const dataLength = datax.length;
    console.log("dataLength : ", dataLength)

    const dataindex = datax.findIndex(item => item.master_tahapan_id == currentData);
    console.log("Current dataindex : "+ dataindex);

    if (dataindex < (dataLength-1)) {
        console.log("masuk tambah")
        return datax[dataindex+1].master_tahapan_id       
    } else {
        return false
    }
}
export const NumBackStep = async (master_jns_pencairan, currentData) => {
    const datax = await getSteps(master_jns_pencairan);
    const dataindex = datax.findIndex(item => item.urut == currentData);
    if (dataindex > 0) {
        return datax[dataindex-1].master_tahapan_id       
    } else {
        return false
    }
}

export const FirstStep = async (master_jns_pencairan, currentData) => {
    const datax = await getSteps(master_jns_pencairan);
    return datax[0].master_tahapan_id
}

export const LastStep = async (master_jns_pencairan, currentData) => {
    const datax = await getSteps(master_jns_pencairan);
    const lastData = datax.length - 1
    const lastStep = datax[lastData].master_tahapan_id
    return lastStep;
}

const getSteps = (master_jns_pencairan) => {

    console.log("=================")
    console.log(master_jns_pencairan)
    console.log("=================")

    return new Promise((resolve, reject) => {
        
        const query = `
            SELECT master_tahapan_id FROM master_jns_pencairan_list
            WHERE master_jns_pencairan_list.master_jns_pencairan_id = ?
            ORDER BY master_jns_pencairan_list.urut ASC
        `;
    
        const values = [master_jns_pencairan];

        db.query(query, values, (err, rows)=>{

            if (err) {
                reject(err);
            } else {
                console.log("=======FIRST STEP")
                console.log(rows)
                console.log("=======FIRST STEP")
                resolve(rows);
            }
        })

    })




}