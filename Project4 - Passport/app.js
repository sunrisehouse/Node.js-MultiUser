const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );

// session, passport
const session = require('express-session');
const sessionFileStore = require('session-file-store')(session);
app.use(session({
    secret: 'sfdzsv@sg352sg',
    resave: false,
    saveUninitialized: true,
    store: new sessionFileStore()
}));

var passport_localStrategy = require('./lib/passport')(app);

// router
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth')(passport_localStrategy);

app.use('/',indexRouter);
app.use('/auth',authRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));