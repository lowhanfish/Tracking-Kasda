import {Router} from 'express'
const router = Router();


import {getUnit} from '../controller/unitKerja.js'


router.post('/', (req, res)=>{
    getUnit(req, res)
})





export default router