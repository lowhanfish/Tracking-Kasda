
import db from "../db/mysql/index.js";
import buildTree from "../lib/buildTree.js";

export const getAddMenu = async (req, res)=>{

    var query = `SELECT * FROM menu`
    return new Promise((resolve, reject) => {
        
    
        db.query(query, async (err, rows)=>{
    
            console.log(rows)
    
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






