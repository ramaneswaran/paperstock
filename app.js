const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');

//ROUTES
const index = require('./routes/index');
const admin = require('./routes/admin');
const courses = require('./routes/courses');
const login = require('./routes/login');

//Set up express app
const app = express();

//Setup body parser for post requests
app.use(express.json());
app.use(express.urlencoded({extended :true}));

//Set up api routes
app.use('/', index);
app.use('/admin', admin);
app.use('/courses', courses);
app.use('/login', login);

//Set up a middleware
app.use(express.static('public'));

//Set up template engine
app.set('view engine', 'ejs');



//CONNECT TO DB
mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true}, (err)=>{
    if(err) console.log(err);
    console.log('Connected to DB');
});

app.listen(process.env.port || 3000, ()=>{
    console.log("Listening to port")
});