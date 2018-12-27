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

app.use('/', indexRouter);
app.use('/containers', containersRouter);
app.use('/images', imagesRouter);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});