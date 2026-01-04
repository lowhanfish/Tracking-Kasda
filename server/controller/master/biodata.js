import dby from '../../db/mysql/simpeg.js'



const getByName = (req, res) => {
    const { nama, sub_unit_kerja } = req.body;

    // console.log(req.body)

    // if (!nama) {
    //     return res.status(400).send({ error: 'Parameter nama wajib diisi' });
    // }

    const query = `
        SELECT 
        biodata.id, 
        biodata.nama, 
        biodata.nip, 
        biodata.gelar_depan, 
        biodata.gelar_belakang 
        
        FROM biodata
        WHERE 
        (biodata.nama LIKE '%`+req.body.nama+`%')
        AND
        biodata.unit_kerja = '`+req.body.sub_unit_kerja+`'
        LIMIT 15
    `;

    // const values = [`%${nama}%`, sub_unit_kerja];


    dby.query(query, (err, rows)=> {
        if (err) {
            res.status(500).send(err);
        } else {

            // console.log(rows)

            // console.log(object)
            for (let i = 0; i < rows.length; i++) {
                
                rows[i].nama = namaLengkap(rows[i]);
                delete rows[i].gelar_depan;
                delete rows[i].gelar_belakang;

            }


            res.status(200).send(rows);
        }

    })
}


export const getBiodataByNIP = (nip_pengusul) => {

    return new Promise((resolve, reject) => {
        
        const query = `
            SELECT 
            biodata.id, 
            biodata.nama, 
            biodata.nip, 
            biodata.gelar_depan, 
            biodata.gelar_belakang 
            
            FROM biodata
            WHERE biodata.nip = '`+nip_pengusul+`'
            LIMIT 1
        `;
    
        // const values = [`%${nama}%`, sub_unit_kerja];
    
    
        dby.query(query, (err, rows)=> {
            if (err) {
                reject (err)
            } else {
                for (let i = 0; i < rows.length; i++) {
                    rows[i].nama = namaLengkap(rows[i]);
                    delete rows[i].gelar_depan;
                    delete rows[i].gelar_belakang;
                }
                resolve(rows[0]);
            }
    
        })
    })


}




const namaLengkap = (data) => {

    // console.log("Data =================== :")

    // console.log(data);

    var gelarDepan = ''
    var gelarBelakang = ''

    if (data.gelar_depan !== '' && data.gelar_depan !== null ) {
        gelarDepan = data.gelar_depan+". "
    }
    if (data.gelar_belakang !== '' && data.gelar_belakang !== null ) {
        gelarBelakang = ", "+data.gelar_belakang
    }

    return gelarDepan+data.nama+gelarBelakang
}

export default getByName;
