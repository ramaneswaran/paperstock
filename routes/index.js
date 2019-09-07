const express = require('express');

const router = express.Router();

//APIs are mentioned below

router.get('/', (req, res)=>{
    res.render('index');
});

router.get('/layout', (req, res)=>{
    res.render('layout');
});

router.get('/test', (req, res)=>{
    res.render('test');
});

module.exports = router;