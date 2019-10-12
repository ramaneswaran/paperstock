const express = require('express');
const router = express.Router();

//Importing database schemas
const schools = require('../models/schools');
const courses = require('../models/courses');


//Setting up middleware for parsing post request
router.use(express.json());
router.use(express.urlencoded({extended: true}));

//Handling requests

//Viewing courses for each school
router.get('/:schoolName', (req,res)=>{

    schools.findOne({"schoolName": req.params.schoolName}, (err, school)=>{
        
        
        if(err) res.send(err);
        if(!school) res.status(404).send('The school is not in DB');
        else{
            const course = school.courses;
            const courseNames = school.courseNames;
            if(course.length >0){
                res.render('courses', {course : course, courseNames : courseNames, schoolName: req.params.schoolName,empty: false})
            }
            else{
                res.render('courses', {course : course, courseNames : courseNames, schoolName: req.params.schoolName ,empty: true})       
            }
        }
    });
});

//Viewing the papers in a course

router.get('/:schoolName/:courseCode/:examType', (req, res)=>{
    courses.findOne({courseCode: req.params.courseCode},(err, course)=>{
        if(err) res.send("404");
        
        const examType = req.params.examType + 'Links';
        const courseLinks = course[examType];
        if(courseLinks.length >0){
            res.render('paper', {courseLinks: courseLinks, examType: examType, schoolName: req.params.schoolName, courseCode: req.params.courseCode, empty: false});
        }
        else{
            
            res.render('paper', {courseLinks: courseLinks, examType: examType, schoolName: req.params.schoolName, courseCode: req.params.courseCode, empty: true});
        }
    });
    
});


module.exports = router;    