import dby from '../db/mysql/simpeg.js'

import dbCondition from '../lib/dbCondition.js'
import dbResolveCondition from '../lib/dbResolveCondition.js'


export const getUnit = (req, res)=>{

    const query = `
    SELECT 
    unit_kerja.unit_kerja,
    unit_kerja.id,
    unit_kerja.instansi

    FROM unit_kerja

    WHERE unit_kerja.unit_kerja LIKE '%`+req.body.unit_kerja+`%'
    
    `

    dby.query(query, (err, rows)=>{
        dbCondition(err, rows)
    })

}