import mysql from "mysql";

var db= mysql.createPool({
    connectionLimit : 50,
    host : process.env.DB_SIMPEG_HOST,
    user : process.env.DB_SIMPEG_USERNAME,
    password : process.env.DB_SIMPEG_PASSWORD,
    database : process.env.DB_SIMPEG,
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