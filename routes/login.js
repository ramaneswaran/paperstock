const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const router = express.Router();

router.get('/', (req, res)=>{
    res.send('Welcome to login page');
});

module.exports  = router;