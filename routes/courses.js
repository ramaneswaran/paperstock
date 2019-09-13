const express = require('express');
const router = express.Router();

//Importing database schemas
const schools = require('../models/schools');
const courses = require('../models/courses');



//Setting up middleware for parsing post request
router.use(express.json());
router.use(express.urlencoded({extended: true}));

//Handling requests


router.get('/:schoolName', (req,res)=>{

    schools.findOne({"schoolName": req.params.schoolName}, (err, school)=>{
        if(typeof school === 'null') res.send('404 error');
        const course = school.courses;
        const courseNames = school.courseNames;
        if(course.length >0){
            res.render('courses', {course : course, courseNames : courseNames, schoolName: req.params.schoolName})
        }
        else{
            res.send("Sorry fam, there are no courses");
        }
    });
});


router.get('/:schoolName/:courseCode/:examType', (req, res)=>{
    courses.findOne({courseCode: req.params.courseCode},(err, course)=>{
        if(err) res.send("404");

        const examType = req.params.examType + 'Links';
        const courseLinks = course[examType];
        if(courseLinks.length >0){
            res.render('paper', {courseLinks: courseLinks, examType: examType, schoolName: req.params.schoolName, courseCode: req.params.courseCode});
        }
        else{
            res.send('Sorry fam no papers have been added yet');
        }
    });
    
});

module.exports = router;    