const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Fuse = require('fuse.js');

//Mongoose model
const Course  = require('../models/courses');

let courseList = []
Course.find({}, (err, courses)=>{
        new Promise((resolve,reject)=>{
        courseList  = courses;
        
        if(courseList) resolve();
        
        if(err) reject(err);
            
    }).then(()=>{
        console.log('CourseLoaded');
    }).catch((err)=>{
        console.log(err);
    })
    
});

router.get('/:courseCode/:examType', (req, res)=>{
    Course.findOne({courseCode: req.params.courseCode},(err, course)=>{
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


router.post('/', (req, res)=>{
    const options = {
        keys: ['courseCode', 'courseName'],

    }
    const fuse = new Fuse(courseList, options)
    let result = []
    fuse.search(req.body.query).forEach((item)=>{
        result.push({
            courseCode: item.courseCode,
            courseName: item.courseName, 
        });
    });
    if(result) res.render('search', {result: result, empty: false});
    else res.render('search', {result: result, empty: true});
});

module.exports = router;