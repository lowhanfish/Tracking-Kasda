import db from "../db/mysql/index.js";
import buildTree from "../lib/buildTree.js";
import buildTreeAccess from "../lib/buildTreeAccess.js";

import dbResolveCondition from "../lib/dbResolveCondition.js"

export const getMenuSidebar = async (req, res) => {

    const level = req.user.profile.level;
    // const level = 23;
    console.log(level)

    const query = `
        SELECT 
        menu.*,
        IFNULL(access.view, 0) as viewx,
        IFNULL(access.add, 0) as addx,
        IFNULL(access.update, 0) as updatex,
        IFNULL(access.remove, 0) as removex

        FROM menu

        LEFT JOIN access
        ON menu.id = access.menu_id AND access.group_id = ${level}
    `

    db.query(query, async (err, rows)=>{
        if (err) {
            res.status(400).send(err);
            console.log(err)
        } else {
            // console.log(rows);
            const filteredTree = buildTreeAccess(rows);
            res.send(filteredTree);
        }
    })
}


const getDataMenu = async () =>{

    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM menu`
        db.query(query, (err, rows)=>{
            dbResolveCondition(resolve, err, rows)
        })
    })
}

export const getAddMenu = async (req, res)=>{

    var query = `SELECT * FROM menu`
    return new Promise((resolve, reject) => {
        
        db.query(query, async (err, rows)=>{

            if (err) {
                res.status(400);
                resolve(err)
            } else {
                const data = []
    
                rows.forEach(element => {

                    if (element.multiple != 1) {
                        
                        element.view = false;
                        element.add = false;
                        element.update = false;
                        element.remove = false;
                    }
                    data.push(element);
                });
    
                const dataFinal = buildTree(data);
                resolve(dataFinal)
    
            }
    
        })
    })
}

export const getUpdateMenu = async (req, res)=>{

    // console.log(req.body)

    var query = `
    SELECT 
    menu.*,
    IFNULL(access.view, false) AS view,
    IFNULL(access.\`add\`, false) AS \`add\`,
    IFNULL(access.\`update\`, false) AS \`update\`,
    IFNULL(access.\`remove\`, false) AS \`remove\`  

    FROM menu
    
    LEFT JOIN access
    ON menu.id = access.menu_id AND access.group_id = `+req.body.id+` 
    ORDER BY menu.number ASC

    `
    return new Promise((resolve, reject) => {
        db.query(query, async (err, rows)=>{
            if (err) {
                res.status(400);
                resolve(err)
            } else {
                const dataFinal = buildTree(rows);
                resolve(dataFinal)
            }
        })
    })
}

