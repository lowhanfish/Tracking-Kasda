import { Router } from 'express';
import db from '../db/mysql/index.js';


const router = Router();



router.get('/',(req, res)=>{
    res.json("OK")
})

router.post('/view',(req, res)=>{
    const query = `SELECT * FROM menu`
    
    db.query(query, (err, rows)=>{
        if (err) {
            console.log(err)
            res.status(422);
            res.send(err)
        } else {
            res.send(rows)
        }
    })
})


router.post('/add',(req, res)=>{
    const data = req.body
    const query = `
        INSERT INTO menu (number, title, icon, path, parent, multiple, createdAt, createdBy) VALUES
        (`+data.number+`, '`+data.title+`','`+data.icon+`','`+data.path+`',`+data.parent+`,`+data.multiple+`,NOW(), '`+req.user._id+`')
    `
    db.query(query, (err, row)=>{
        if (err) {
            console.log(err)
            res.status(422);
            res.send(err)
        } else {
            res.send(row)
        }
    })

})





export default router;