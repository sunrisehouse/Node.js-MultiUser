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
                var sql = 'select * from users where id = ?'
                var query = db.query(sql,id,function( err, results, fields){
                    if(err) { throw err }
                    else{
                        var user = results[0];
                        if(user){
                            if(user.password === password){
                                console.log('id pwd success')
                                return done(null,user);    
                            }else{
                                console.log('pwd fail')
                                return done(null,false);
                            }
                        }
                        else{
                            console.log('id fail')
                            return done(null,false);
                        }
                    }
                })
            }
        )
    );
    passport.serializeUser(function(user,done){
        // login success
        console.log('serializeUser : ',user);
        done(null,user.id);
    });
    passport.deserializeUser(function(id,done){
        console.log('deserializeUser : ',id);
        done(null,id);
    });

    return passport;

}