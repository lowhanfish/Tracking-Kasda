import {Router} from 'express'
import getByName from '../../controller/master/biodata.js';



const router = Router();

router.post('/getByName', (req, res) => {
    getByName(req, res);
})
router.post('/getByNIP', (req, res) => {
    res.send("OK")
})








export default router
