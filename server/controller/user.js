import db from "../db/mysql/index.js";
import dbx from "../db/mysql/egov.js";
import dbCondition from "../lib/dbCondition.js";
import dbResolveCondition from "../lib/dbResolveCondition.js";


export const getDataUser = (req, res) =>{
    const query = `
    SELECT
    users.username,
    users.name,
    users.email,
    users.address,
    users.phone,
    users.createdAt,
    users.createdBy
    FROM users
    `
    dbx.query(query, (err, rows)=>{
        dbCondition(res, err, rows)
    })
}


export const updateAccount = (req, res)=>{

}
export const updateProfile = (req, res)=>{

}

