var express = require('express');
var router = express.Router();
var db = require('../lib/db')

module.exports = function(passport){

    router.get('/login',function(req,res){
        res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
    </head>
    <body>
        <h1>Sign In</h1>
    
        <form action="./signin" method="post">
            id :        <input type="text" name="id"><br>
            password :  <input type="text" name="password"><br>
   
            <input type="submit">
            <a href="./register">sign up</a>
        </form>
   
    </body>
    </html>
    `)
    })
    router.get('/register',function(req,res){
        res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    </head>
    <body>
        <h1>Sign Up </h1>

        <form action="./signup" method="post">
            id :       <input type="text" name="id" id="_id">    <button type ="button" id="btn_checkIDOverlap">check id overlap</button><br>
            password : <input type="text" name="password"><br>
            email :    <input type="text" name="email"><br>
            name :     <input type="text" name="name"><br>
            <input type="submit">
            <a href="./login">Sign In</a>
        </form>
        <script type="text/javascript">
        
        $('#btn_checkIDOverlap').click(function(){
            $.ajax({
                url:'./overlap',
                dataType:'json',
                type:'POST',
                data:{id:$('#_id').val()},
                success:function(result){
                    if(result['result']==true){
                        if(result['isOverlap']==true){
                            alert("overlap")
                        }else{
                            alert("can use")
                        }
                    }else{
                        alert("network error")
                    }
                }
            })
        })

        </script>

    </body>
    </html>
    `)
    });

    router.post('/signin',passport.authenticate('local', {   
        successRedirect: '/',
        failureRedirect: '/auth/login' }));

    router.get('/signout',function(req,res){
        // logout 후에 login data 세션에 저장
        req.logOut();
        req.session.save(function(){
            res.redirect('/');
        });
    });

    router.post('/signup',function(req,res){
        var user = {        // 암호화된 hash 와 salt 값 을 저장
            'id' : req.body.id,
            'password': req.body.password,
            'salt':'',
            'name' : req.body.name,
            'email' : req.body.email
        }
          var sql = 'insert into users SET ?'
  
          var query = db.query(sql, user , function(err, rows) {
              if(err) { throw err}
              else{
                  console.log('insert success')
                  res.redirect('./login');
              }
          })
    });
    
    return router;
};
