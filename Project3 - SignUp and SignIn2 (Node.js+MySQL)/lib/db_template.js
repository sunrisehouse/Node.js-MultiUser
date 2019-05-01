const mysql = require('mysql')
const db_connection = mysql.createConnection({
    host : '',
    user : '',
    password : '',
    port : ,
    database : ''
})

db_connection.connect(function(err){
    if(err) throw err;
    console.log("db connected!")
})

module.exports = db_connection