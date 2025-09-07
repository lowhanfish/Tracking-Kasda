import db from "../db/mysql/index.js";
import dbResolveCondition from "../lib/dbResolveCondition.js";


export const add = async (req, res)=> {
    const addx = await addGroup(req, res);
    res.send(addx);
}


export const addGroup = async (req, res) => {
    var data = req.body;
    var query = `INSERT INTO group (title, access_unit, createdAt, createdBy) VALUES (?, ?, NOW(), ?)`
    var values = [
        data.title, data.access_unit, req.user._id
    ];

    return new Promise((resolve, reject) => {
        db.query(query, values,(err, rows)=>{
            dbResolveCondition(resolve)
        })
    })
}