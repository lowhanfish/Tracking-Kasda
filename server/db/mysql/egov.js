import mysql from "mysql";

var db= mysql.createPool({
    connectionLimit : 50,
    host : process.env.DB_USER_HOST,
    user : process.env.DB_USER_USERNAME,
    password : process.env.DB_USER_PASSWORD,
    database : process.env.DB_USER,
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