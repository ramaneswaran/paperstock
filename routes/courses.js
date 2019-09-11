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
            res.render('courses', {course : course, courseNames : courseNames, schoolName: req.params.schoolName})
        }
        else{
            res.send("Sorry fam, there are no courses");
        }
    });
});

router.get('/:schoolName/:courseCode/:examType', (req, res)=>{
    courses.findOne({courseCode: req.params.courseCode},(err, course)=>{
        const examType = req.params.examType + 'Links';
        console.log(examType);
        const courseLinks = course[examType];
        if(courseLinks.length >0){
            res.render('paper', {courseLinks: courseLinks, examType: examType});
        }
        else{
            res.send('Sorry fam no papers have been added yet');
        }
    });
   
   res.json(req.params);
});

module.exports = router;    