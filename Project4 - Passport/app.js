const express = require('express');
const app = express();
const port = 3000;

// router
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');

app.use('/',indexRouter);
app.use('/auth',authRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));