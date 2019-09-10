const express = require('express');
const router = express.Router();

//Importing database schemas
const schools = require('../models/schools');
const courses = require('../models/courses');


var data = [{item: 'get milk'}, {item: 'walk dog'}];

//Setting up middleware for parsing post request
router.use(express.json());
router.use(express.urlencoded({extended: true}));

//Handling requests

router.get('/', (req, res)=>{
    res.render('courses', {todos: data});
})
let courseList = [];
router.post('/submit', (req, res)=>{
    schools.findOne({"schoolName": req.body.schoolName}, (err, school)=>{
        if(err) throw err;
        courseList = school.courses;
    });

    res.json(courseList);
});

router.get('/:id', (req,res)=>{
    res.send(req.params.id);
})

module.exports = router;    