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
});


router.get('/:id', (req,res)=>{

    
    
    schools.findOne({"schoolName": req.params.id}, (err, school)=>{
        const course = school.courses;
        const courseNames = school.courseNames;
        if(course.length >0){
            res.render('courses', {course : course, courseNames : courseNames})
        }
        else{
            res.send("Sorry fam, there are no courses");
        }
    });

    

});

module.exports = router;    