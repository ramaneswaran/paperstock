const express = require('express');
const router = express.Router();

//Routes
const auth = require('./auth');
const post = require('./post');

//Importing database schemas
const schools = require('../models/schools');
const courses = require('../models/courses');

//Route middlewares
router.use('/post', post);

//Setting up middleware for parsing post request
router.use(express.json());
router.use(express.urlencoded({extended: true}));

//Handling the requests

//Rendering views for admin panel
router.get('/', (req, res)=>{
    res.render('admin');
});

router.get('/addcourse', (req, res)=>{
    res.render('addcourse');
});

router.get('/addpaper', (req, res)=>{
    res.render('addpaper');
});

router.get('/f', (req, res)=>{
    res.render('failure', {item: 'Shit'});
})



module.exports = router;