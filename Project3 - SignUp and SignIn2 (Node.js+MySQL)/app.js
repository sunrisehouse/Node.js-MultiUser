const express = require('express')
const app = express()
const port = 3000

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// body parser �� app ���� post �� get �� json data �������� �ޱ� ����
const bodyParser = require('body-parser');
app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );

//====================================================
/*  MySQL DB ����  */

const db_connection = require('./lib/db')

/*
db data 숨기기 이전 
const db_connection = mysql.createConnection({
    host : '',
    user : '',
    password : '',
    port : 1,
    database : ''
})
db_connection.connect(function(err){
    if(err) throw err;
    console.log("db connected!")
})
*/

//===<  get  >=========================================
app.get('/',function(req,res){
    res.send('hello')
})
app.get('/signin', function(req, res){
    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
    </head>
    <body>
        <h1>Sign In</h1>
    
        <form action="/signin" method="post">
            id :        <input type="text" name="id"><br>
            password :  <input type="text" name="password"><br>
   
            <input type="submit">
            <a href="./signup">sign up</a>
        </form>
   
    </body>
    </html>
    `)
})
app.get('/signup',function(req,res){
    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
    </head>
    <body>
        <h1>Sign Up </h1>

        <form action="/signup" method="post">
            id :       <input type="text" name="id"><br>
            password : <input type="text" name="password"><br>
            email :    <input type="text" name="email"><br>
            name :     <input type="text" name="name"><br>
   
            <input type="submit">
            <a href="./signin">Sign In</a>
        </form>
   
    </body>
    </html>
    `)
})


//=====<  post  >==========================================================

app.post('/signin',function(req,res){
    
    var id = req.body.id
    var password = req.body.password

    var sql = 'select * from users where id = ?'
    var query = db_connection.query(sql,id,function( err, results, fields){
        if(err) { throw err }
        else{
            console.log(results)
            if(results.length>0){
                if(results[0].password == password){
                    res.send('success sign in')
                }
                else{
                    res.send('fail: wrong password')
                }
            }
            else{
                res.send('fail: wrong id')
            }
        }
    })
})
app.post('/signup',function(req,res){
    var user = {
        'id' : req.body.id,
        'password' : req.body.password,
        'name' : req.body.name,
        'email' : req.body.email
    }
    var sql = 'insert into users SET ?'

    var query = db_connection.query(sql, user , function(err, rows) {
        if(err) { throw err}
        else{
            console.log(rows)
        }
    })
})