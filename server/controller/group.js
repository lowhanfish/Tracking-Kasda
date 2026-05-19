import db from "../db/mysql/index.js";
import dbCondition from "../lib/dbCondition.js";
import dbResolveCondition from "../lib/dbResolveCondition.js";

import {addx as addTahapan, removeTahapan} from '../controller/access_tahapan.js'

export const viewGet = (req, res)=>{
    const query = `SELECT * FROM \`group\``
    db.query(query,(err, rows)=>{
        dbCondition(res, err, rows)
    })
}

export const view = (req, res)=>{
    const query = `SELECT * FROM \`group\``;
    db.query(query,(err, rows)=>{
        dbCondition(res, err, rows)
    })
}

export const add = async (req, res)=> {

    // console.log(req.body)
    
    const arr = normalizeArray(req.body.array)
    
    const addx = await addGroup(req, res);
    await addAccess(arr, req, res, addx.message.insertId);
    await addTahapan(req.body.listTahapan, addx.message.insertId)
    
    res.send(addx);
    // res.send("OK")
}

export const update = async(req, res) =>{
    var data = req.body.data;
    console.log("==============")
    // console.log(req.body)
    console.log("==============")
    var arr = normalizeArray(req.body.array)
    await updateGroup(data);
    await removeAccess(req, res, data.id)
    await addAccess(arr, req, res, data.id);
    await removeTahapan(data.id)
    await addTahapan(req.body.listTahapan, data.id)
    res.send(data);
}

export const addGroup = async (req, res) => {
    var data = req.body.data;
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

export const updateGroup = async (data)=>{

    return new Promise((resolve, reject) => {
        const query = `
            UPDATE \`group\` SET
            title = '`+data.title+`',
            access_unit = `+data.access_unit+`
            WHERE id = `+data.id+`
        `
        db.query(query, (err, rows)=>{
            if (err) {
                console.log("error : "+err)
                reject(err)
            } else {
                // console.log("sukses Update")
                resolve(rows)
            }
        })
        
    })


}


export const addAccess = async(arr, req, res, insertId)=>{
    const data = arr;

    for (let i = 0; i < data.length; i++) {
        await loopAccess(req, data[i], insertId)     
    }
    
}

const loopAccess = async (req, data, insertId) =>{

    return new Promise((resolve, reject) => {

        // console.log(data.id)
        
        const query = `
        INSERT INTO \`access\` (menu_id, group_id, view, \`add\`, \`update\`, \`remove\`, createdAt, createdBy) VALUES (?,?,?,?,?,?,NOW(),?)`;

        const values = [data.id, insertId, data.view, data.add, data.update, data.remove, req.user._id];

        // console.log(values)

        db.query(query, values, (err, rows)=>{
            if (err) {
                console.log(err);
                resolve({
                    status :500,
                    message : err
                })
            } else {
                // console.log("sukses update :"+data.id)
                resolve({
                    status :200,
                    message : rows
                })
            }
        })
    })
}

export const normalizeArray = (arr)=>{
    const result = [];
    // console.log(arr)
  
  function helper(items) {
    for (const item of items) {
      // salin item tanpa properti children
      const { children, ...rest } = item;
      
        if (rest.view==true ||rest.add==true || rest.update==true || rest.remove==true) {
            result.push(rest);
        }

      if (children && Array.isArray(children)) {
        helper(children); // rekursif
      }
    }
  }
  
  helper(arr);
  return result;
}

export const removeGroup = async (req, res)=>{

    // console.log(req.body)

    const query = `
        DELETE FROM \`group\` WHERE id = `+req.body.id+`
    `

    db.query(query, async (err, rows)=>{
        await removeAccess(req, res, req.body.id)
        dbCondition(res, err, rows)
    })


}

export const removeAccess = async(req, res, group_id) => {
//    console.log(req.body); 

    return new Promise((resolve, reject) => {
        const query = `
            DELETE FROM \`access\` WHERE group_id = `+group_id+`
        `
        db.query(query, (err, rows)=>{
            dbResolveCondition(resolve, err, rows)
        })
        
    })

}