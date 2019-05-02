const express = require('express')
const app = express()
const port = 3000

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// body parser ÔøΩÔøΩ app ÔøΩÔøΩÔøΩÔøΩ post ÔøΩÔøΩ get ÔøΩÔøΩ json data ÔøΩÔøΩÔøΩÔøΩÔøΩÔøΩÔøΩÔøΩ ÔøΩﬁ±ÔøΩ ÔøΩÔøΩÔøΩÔøΩ
const bodyParser = require('body-parser');
app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );

// password æœ»£»≠ ¿ß«— bkkdf2
var bkfd2Password = require("pbkdf2-password");
var hasher = bkfd2Password();

//====================================================
/*  MySQL DB ÔøΩÔøΩÔøΩÔøΩ  */

const db_connection = require('./lib/db')

/*
db data ?à®Í∏∞Í∏∞ ?ù¥?†Ñ 
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
            id :       <input type="text" name="id">    <button type ="button" id="btn_checkIDOverlap">check id overlap</button><br>
            password : <input type="text" name="password"><br>
            email :    <input type="text" name="email"><br>
            name :     <input type="text" name="name"><br>
            <input type="submit">
            <a href="./signin">Sign In</a>
        </form>
        <script type="text/javascript">
        // id ¡ﬂ∫π √º≈© ¿ß«ÿ
        var isRightID = false
        var httpRequest;
        
        (function(){
            document.getElementById("btn_checkIDOverlap").addEventListener('click',checkIDOverlap);

            function checkIDOverlap(){
                httpRequest = new XMLHttpRequest();

                if (!httpRequest) {
                alert('Giving up :( Cannot create an XMLHTTP instance');
                return false;
                }
                httpRequest.onreadystatechange = alertContents;
                httpRequest.open('POST', "./ajax");
                httpRequest.send({'hello':'hi'});
            }
            function alertContents() {
                if (httpRequest.readyState === XMLHttpRequest.DONE) {
                    if (httpRequest.status === 200) {
                      alert(httpRequest.responseText);
                    } else {
                      alert('There was a problem with the request.');
                    }
                }
            }
        })()
        </script>

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

                hasher({password:password, salt:results[0].salt}, function(err, pass, salt, hash){
                    console.log(hash)
                    console.log('vs')
                    console.log(results[0].password)

                    if(hash === results[0].password){   // req.body.password ∏¶ æœ»£»≠«— hash øÕ db ø° ¿˙¿Âµ» æœ»£»≠µ» password ∏¶ ∫Ò±≥
                        res.send('success sign in')
                    }
                    else{
                        res.send('fail: wrong password')
                    }
                });
            }
            else{
                res.send('fail: wrong id')
            }
        }
    })
    /*
    //password æœ»£»≠ ¿¸
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
    */
})
app.post('/signup',function(req,res){
    hasher({password: req.body.password}, function(err, pass, salt, hash){
        var user = {        // æœ»£»≠µ» hash øÕ salt ∞™ ¿ª ¿˙¿Â
          'id' : req.body.id,
          'password': hash,
          'salt': salt,
          'name' : req.body.name,
          'email' : req.body.email
        }
        console.log('password : '+hash)
        var sql = 'insert into users SET ?'

        var query = db_connection.query(sql, user , function(err, rows) {
            if(err) { throw err}
            else{
                console.log(rows)
            }
        })
    })
    
    /*
    // password æœ»£»≠ ¿¸
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
    */
})

app.post('/ajax',function(req,res){
    console.log('ajax')
    console.log(req.body.hello)

    res.send({result:true,msg:'sgsgsgsgdss'})
    
})