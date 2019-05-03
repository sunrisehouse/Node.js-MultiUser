const express = require('express')
const app = express()
const port = 3000

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// body parser ï¿½ï¿½ app ï¿½ï¿½ï¿½ï¿½ post ï¿½ï¿½ get ï¿½ï¿½ json data ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ ï¿½Þ±ï¿½ ï¿½ï¿½ï¿½ï¿½
const bodyParser = require('body-parser');
app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );

// password ¾ÏÈ£È­ À§ÇÑ bkkdf2
var bkfd2Password = require("pbkdf2-password");
var hasher = bkfd2Password();

//====================================================

const db_connection = require('./lib/db')

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
        // id Áßº¹ Ã¼Å© À§ÇØ
        var isRightID = false
        var httpRequest;
        
        (function(){
            document.getElementById("btn_checkIDOverlap").addEventListener('click',checkIDOverlap);

            function checkIDOverlap(){
                if(window.XMLHttpRequest){
                    httpRequest = new XMLHttpRequest();
                }
                
                if (!httpRequest) {
                    alert('Giving up :( Cannot create an XMLHTTP instance');
                    return false;
                }
                httpRequest.onreadystatechange = alertContents;
                httpRequest.open('POST', './overlap');
                httpRequest.setRequestHeader('Content-Type', 'application/json');
                httpRequest.send({'id':'wjddnv'});
            }
            function alertContents() {
                if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                      alert(httpRequest.responseText);
                }else{
                    alert('There was a problem with the request.');
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

                    if(hash === results[0].password){   // req.body.password ¸¦ ¾ÏÈ£È­ÇÑ hash ¿Í db ¿¡ ÀúÀåµÈ ¾ÏÈ£È­µÈ password ¸¦ ºñ±³
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
})
app.post('/signup',function(req,res){
    hasher({password: req.body.password}, function(err, pass, salt, hash){
        var user = {        // ¾ÏÈ£È­µÈ hash ¿Í salt °ª À» ÀúÀå
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
})

app.post('/overlap',function(req,res){
    console.log(req.body)
    var id = req.body.id
    console.log('aaaaaaaaaaaaaa')
/*
    var sql = 'select * from users where id = ?'
    var query = db_connection.query(sql,id,function( err, results, fields){
        if(err) { throw err }
        else{
            if(results.length>0){
                res.send({result:true,isOverlap:true})
            }
            else{
                res.send({result:true,isOverlap:false})
            }
                
        }
    })
*/  
    
})