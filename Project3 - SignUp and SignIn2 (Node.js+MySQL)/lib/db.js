const mysql = require('mysql')
const db_connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'aaaa0000',
    port : 3306,
    database : 'study_db'
})

db_connection.connect(function(err){
    if(err) throw err;
    console.log("db connected!")
})

module.exports = db_connection