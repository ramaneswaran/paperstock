const express = require('express');

const router = express.Router();

router.get('/', (req, res)=>{
    res.render('admin');
});

router.get('/addcourse', (req, res)=>{
    res.render('addcourse');
});

router.get('/addpaper', (req, res)=>{
    res.render('addpaper');
});

router.get('/linkcourse', (req, res)=>{
    res.render('linkcourse')
});


module.exports = router;