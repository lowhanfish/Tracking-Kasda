import { Router } from 'express';
import db from '../db/mysql/index.js';
import buildTree from '../lib/buildTree.js';


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
            const data = buildTree(rows)
            console.log(data);
            res.send(data)
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




router.post('/update',(req, res)=>{
    const data = req.body;
    // console.log(data);
    // res.send(data);
    const query = `
        UPDATE menu SET
        number = `+data.number+`,
        title = '`+data.title+`',
        icon = '`+data.icon+`',
        path = '`+data.path+`',
        parent = `+data.parent+`,
        multiple = `+data.multiple+`

        WHERE id = `+data.id+`
    `

    db.query(query, (err, rows)=>{
        if (err) {
            console.log(err);
            res.status(422);
            res.json(err)
        } else {
            res.json(rows)
        }
    })
});


router.post('/remove', (req, res)=>{
    const query = `
        DELETE from menu
        WHERE id = `+req.body.id+`
    `

    db.query(query, (err, rows)=>{
        if (err) {
            console.log(err);
            res.status(422);
            res.send(err);
        } else {
            res.json(rows)
        }
    })
})




export default router;