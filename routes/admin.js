const express = require('express');
const router = express.Router();
const verify = require('./verifyToken');

//Routes
const auth = require('./auth');
const post = require('./post');


//Route middlewares
router.use('/post', post);  //Used for posting courses and papers
router.use('/auth', auth); //Used for login and register



//Rendering views for admin panel
router.get('/', (req, res)=>{
    res.render('login');
});

router.get('/adminPanel', verify ,(req, res) => {
    res.render('admin');
});

router.get('/addcourse', verify ,(req, res)=>{
    res.render('addcourse');
});

router.get('/addpaper', verify, (req, res)=>{
    res.render('addpaper');
});


module.exports = router;