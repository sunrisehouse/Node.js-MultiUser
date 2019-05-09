var db = require('../lib/db');

module.exports = function(app) {
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;

    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(
        new LocalStrategy(
            {
                usernameField:'id',
                passwordField:'password'
            },
            function(id,password,done){
                var users = db.selectUser(id);
                console.log('users : ',users);
                var user = users[0];
                
                if(user){
                    if(password ===user.password){
                        console.log('yes login');
                        return done(null,user);
                    }else{
                        console.log('no password');
                        return done(null, fasle);
                    }
                }else{
                    console.log('no id');
                    return done(null,false);
                }
            }
        )
    );
    passport.serializeUser(function(user,done){
        console.log('serializeUser : ',user);
    });
    passport.deserializeUser(function(id,done){
        console.log('deserializeUser : ',id);
    });

    return passport;

}