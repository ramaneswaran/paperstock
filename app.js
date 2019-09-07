const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');

//ROUTES
const index = require('./routes/index');
const admin = require('./routes/admin');

//Set up express app
const app = express();

//Set up api routes
app.use('/', index);
app.use('/admin', admin);

//Set up a middleware
app.use(express.static('public'));

//Set up template engine
app.set('view engine', 'ejs');

//CONNECT TO DB
mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true}, ()=>{
    console.log('Connected to DB');
});

app.listen(process.env.port || 3000, ()=>{
    console.log("Listening to port")
});