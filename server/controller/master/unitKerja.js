import dby from '../../db/mysql/simpeg.js'

import dbCondition from '../../lib/dbCondition.js'
import dbResolveCondition from '../../lib/dbResolveCondition.js'


export const getUnit = (req, res)=>{

    // console.log(req.body)
    

    const query = `
    SELECT 
    unit_kerja.unit_kerja,
    unit_kerja.id,
    unit_kerja.instansi,
    instansi.instansi as uraian_instansi

    FROM unit_kerja
    LEFT JOIN instansi
    ON instansi.id =  unit_kerja.instansi

    WHERE unit_kerja.unit_kerja LIKE '%`+req.body.data+`%'

    LIMIT 15
    
    `

    dby.query(query, (err, rows)=>{
        dbCondition(res, err, rows)
    })

}


export const getUnitById = (id_unit) => {

    return new Promise((resolve, reject) => {
        
        const query = `
            SELECT 
            unit_kerja.unit_kerja,
            unit_kerja.id,
            unit_kerja.instansi,
            instansi.instansi as uraian_instansi
    
            FROM unit_kerja
            LEFT JOIN instansi
            ON instansi.id =  unit_kerja.instansi
    
            WHERE unit_kerja.id = ?
    
            LIMIT 1
        
        `
    
        const values = [id_unit];
    
        dby.query(query, values, (err, rows)=> {
            
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(rows[0]);
            }
    
        })
    })





}