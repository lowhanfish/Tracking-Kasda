import mysql from "mysql";

var db= mysql.createPool({
    connectionLimit : 50,
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'react_temp'
});


db.getConnection((err, connection)=>{
    if (err) {
        console.log(err);
        throw err
    } else {
        console.log("TERKONEKSI DENGAN DATABASE UTAMA")
    }
})


export default db