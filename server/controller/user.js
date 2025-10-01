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

export const countUsersGroup = async (req, res)=>{

    return new Promise((resolve, reject) => {
        
        const query = `
            
        `
    
        db.query(query, ()=>{
            dbResolveCondition(resolve, err, rows)
        })
    })

}

export const updateUsersGroup = async (req, res)=>{

    return new Promise((resolve, reject) => {
        const query = `
            UPDATE users_group
            SET
            group_id = `+req.body.group_id+`
            WHERE
            user_id = '`+req.body.user_id+`'
        `
    
        db.query(query, ()=>{
            dbResolveCondition(resolve, err, rows)
        })
        
    })

}
export const addUsersGroup = async (req, res)=>{

    return new Promise((resolve, reject) => {
        const query = `
            
        `
    
        db.query(query, ()=>{
            dbResolveCondition(resolve, err, rows)
        })
        
    })
}

