let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
let mongoose = require('mongoose');
let ejs = require('ejs');

let app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// Setup serveur local
let port = 3000;
app.listen(port, () => {
    console.log('Server started on port http://localhost:' + port + '/');
});

//routers
let indexRouter = require('./routes/indexRoute');

//routes
app.use('/', indexRouter);