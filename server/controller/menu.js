
import db from "../db/mysql/index.js";
import buildTree from "../lib/buildTree.js";

import dbResolveCondition from "../lib/dbResolveCondition.js"


// export const getMenuSidebar = (req, res) =>{

//     console.log(req.user.profile.level)

//     const query = `
//         SELECT * 
//         FROM users_group

//     `
//     db.query(query, (err, rows)=>{
//         if (err) {
//         console.log(err);
//         res.status(500);
//         res.send(err);
//     } else {
//         res.status(200);
//         res.send(rows);
//     }
//     })
// }


export const getMenuSidebar = async (req, res) => {

    const level = req.user.profile.level;
    console.log(level)

    const query = `
        SELECT 
        menu.*

        FROM access

        LEFT JOIN menu
        ON menu.id = access.menu_id

        WHERE access.group_id = ${level}

    `

    db.query(query, async (err, rows)=>{
        if (err) {
            res.status(400)
            console.log(err)
        } else {

            const data = []

            const menu = await getDataMenu()
            const x2 = menu.message


        

            x2.forEach(element => {


                    if (element.multiple != 1) {
                        
                        element.view = false;
                        element.add = false;
                        element.update = false;
                        element.remove = false;
                    }
    
    
                    data.push(element);
                
            });



            const dataFinal= buildTree(data)

            // console.log(dataFinal)

            // const data = rows;
            // console.log(data)

            res.send(dataFinal);

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
    
            // console.log(rows)
    
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

    console.log(req.body)

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

