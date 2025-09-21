import db from "../db/mysql/index.js";
import dbResolveCondition from "../lib/dbResolveCondition.js";


export const add = async (req, res)=> {
    // console.log(req.body.array)
    const arr = normalizeArray(req.body.array)
    console.log(arr)
    res.send("OK")
    // const addx = await addGroup(req, res);
    // const access = await addAccess(req, res, addx.message.insertId);
    // console.log(addx.message.insertId)
    // res.send(addx);
}


export const addGroup = async (req, res) => {
    var data = req.body.data;
    // var query = `INSERT INTO group (title, access_unit, createdAt, createdBy) VALUES (?, ?, NOW(), ?)`
    var query = `INSERT INTO \`group\` (title, access_unit, createdAt, createdBy) VALUES (?, ?, NOW(), ?)`
    var values = [
        data.title, data.access_unit, req.user._id
    ];

    return new Promise((resolve, reject) => {
        db.query(query, values,(err, rows)=>{
            dbResolveCondition(resolve, err, rows)
        })
    })
}


const addAccess = async(req, res, insertId)=>{
    const data = req.body.array;

    for (let i = 0; i < data.length; i++) {
        await loopAccess(data[i], insertId)
        
    }
    
}

const loopAccess = async (data, insertId) =>{

    return new Promise((resolve, reject) => {
        
        const query = `INSERT INTO access (menu_id, group_id, add, update, remove, createdAt, createdBy) VALUES (?,?,?,?,?,NOW(),?)`
        const values = [data.id, insertId, data.add, data.update, data.remove, req.user._id];
    
        db.query(query, values, (err, rows)=>{
            dbResolveCondition(resolve, err, rows)
        })
    })
}


const normalizeArray = (arr)=>{
    const result = [];
  
  function helper(items) {
    for (const item of items) {
      // salin item tanpa properti children
      const { children, ...rest } = item;
      result.push(rest);

      if (children && Array.isArray(children)) {
        helper(children); // rekursif
      }
    }
  }
  
  helper(arr);
  return result;
}