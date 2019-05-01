const express = require('express')
const app = express()
const port = 3000

const mysql = require('mysql')
const connection = mysql.createConnection({
    host : '',
    user : '',
    password : '',
    port : 3,
    database : ''
})

connection.connect(function(err){
    if(err) throw err;
    console.log("db connected!")
})

app.listen(port, () => console.log(`Connecting Node.js and mySQL app listening on port ${port}!`))