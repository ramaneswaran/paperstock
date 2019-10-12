const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Fuse = require('fuse.js');

//Mongoose model
const Course  = require('../models/courses');

//Route
const courses = require('./courses');

//Route middleware
router.use('/courses', courses);


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