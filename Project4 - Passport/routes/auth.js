var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use( bodyParser.urlencoded({ extended: true }) );
router.use( bodyParser.json() );

var signLib = require('../lib/sign');

router.get('/login',function(req,res){
    res.send('Login');
})
router.get('/register',function(req,res){
    res.send('Register');
});

router.post('/signin',function(req,res){
    var body = req.body;
    var id = body.id;
    var password = body.password;

    if(signLib.signIn(id, password)){
        res.send('sign in success');
    }else{
        res.send('sign in fail');
    }
});

router.post('/signup',function(req,res){
    var body = req.body;
    var id = body.id;
    var password = body.password;
    var name = body.name;
    var email = body.email;

    if(signLib.signUp(id,password,name,email)){
        res.send('sign up success');
    }else{
        res.send('sign up fail');
    }
});

router.post('/signout',function(req,res){
    var body = req.body;
    var id = body.id;
    
    if(signLib.signOut(id)){
        res.send('sign out success');
    }else{
        res.send('sign out fail');
    }
});

module.exports = router;