import { Router } from "express";
import { add, view, editex, deletex, viewAccessUser, viewAccessUserEdit } from "../../controller/master/masterTahapan.js";



const router = Router();



router.post('/view', (req,res)=>{
    view(req, res)
})
router.post('/viewAccessUser', (req,res)=>{
    viewAccessUser(req, res)
})
router.post('/viewAccessUserEdit', (req,res)=>{
    viewAccessUserEdit(req, res)
})


router.post('/add', (req,res)=>{
    console.log("add masterTahapan di panggil")
    add(req, res)
})
router.post('/edit', (req,res)=>{
    console.log("edit masterTahapan di panggil")
    editex(req, res)
})
router.post('/delete', (req,res)=>{
    console.log("Delete masterTahapan di panggil")
    deletex(req, res)
})







export default router