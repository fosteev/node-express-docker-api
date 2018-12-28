var express = require('express');
var app = express();

const indexRouter = require('./routes/index');
const containersRouter = require('./routes/containers');
const imagesRouter = require('./routes/images');

const cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    type: 'application/json',
    extended: true
}))
app.use(bodyParser.json()); // for parsing application/json

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:7000");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/', indexRouter);
app.use('/containers', containersRouter);
app.use('/images', imagesRouter);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});