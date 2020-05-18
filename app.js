const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

const app = express();

//Mongo Connect
mongoose.connect("mongodb://localhost:27017/passportLocal", {useNewUrlParser: true, useUnifiedTopology: true});

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//bodyParser
app.use(express.urlencoded({extended: false}));

//Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log('Server Started on ' + PORT ));