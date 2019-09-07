const express = require('express');
const routes = require('./routes/api');
const mongoose = require('mongoose');

//Set up express app
const app = express();

//Set up api routes
app.use(routes);

//Set up a middleware
app.use(express.static('public'));

//Set up template engine
app.set('view engine', 'ejs');


app.listen(process.env.port || 3000, ()=>{
    console.log("Listening to port")
});