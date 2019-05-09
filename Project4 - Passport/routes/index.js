var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
    if(req.user){
        console.log("a?? ",req.user);
        res.send(`${req.user} hello
        <a href='/auth/signout'>sign out </a>
    `);
    }else{
        res.send('hello');
    }
});

module.exports = router;