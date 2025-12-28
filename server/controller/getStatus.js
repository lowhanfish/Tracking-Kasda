import db from "../db/mysql/index.js";




export const canUpdate = ()=> {
    return new Promise((resolve, reject) => {
        const query = ``;
        const values = [];
        db.query(query, values, (err, rows)=> {
            if (err){
                reject(err)
            }else{
                resolve(rows)
            }
        })
    })
}


export const dummyStatus = () => {
    return new Promise((resolve, reject) => {
        const query = ``;
        const values = [];
        db.query(query, values, (err, rows)=> {
            if (err){
                reject(err)
            }else{
                resolve(rows)
            }
        })
    })
}