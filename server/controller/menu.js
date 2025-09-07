
import db from "../db/mysql/index.js";
import buildTree from "../lib/buildTree.js";

export const getAddMenu = (req, res)=>{
    const query = `SELECT * FROM menu`

    db.query(query, async (err, rows)=>{

        if (err) {
            res.status(400);
            res.send(err)
        } else {
            const data = []

            rows.forEach(element => {

                element.add = false;
                element.update = false;
                element.remove = false;

                data.push(element);
            });

            const dataFinal = buildTree(data);
            res.send(dataFinal)


        }

    })
}






