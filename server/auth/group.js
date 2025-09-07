import { Router } from "express";
import db from "../db/mysql/index";
import buildTree from "../lib/buildTree";


const router = Router();


router.get('/', (req, res)=>{
    res.json("Active");
})


router.post('/view', (req, res)=>{

})
router.post('/add', (req, res)=>{

})
router.post('/update', (req, res)=>{

})
router.post('/remove', (req, res)=>{

})



const addGroup = async () => {
    var data = req.body;
    var query = ``

    return new Promise((resolve, reject) => {
        db.query((err, rows)=>{
            if (err) {
                console.log(err);
                resolve({
                    status :400,
                    message : err
                })
            } else {
                resolve({
                    status :201,
                    message : rows.insertId
                })
            }
        })
    })
}






export default router
