const express = require('express');
const router = express.Router();

//Importing database schemas
const schools = require('../models/schools');
const courses = require('../models/courses');



//Setting up middleware for parsing post request
router.use(express.json());
router.use(express.urlencoded({extended: true}));

//Handling requests

router.get('/', (req, res)=>{
    res.render('courses', {todos: data});
});


router.get('/:schoolName', (req,res)=>{

    schools.findOne({"schoolName": req.params.schoolName}, (err, school)=>{
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

router.get('/school/:courseCode', (req, res)=>{
    courses.findOne({courseCode: req.params.courseCode},(err, course)=>{
        const courseLinks = course.courseLinks;
        if(courseLinks.length >0){
            res.render('paper', {courseLinks: courseLinks});
        }
        else{
            res.send('Sorry fam no papers have been added yet');
        }
    });
});

module.exports = router;    