const express = require('express');
const router = express.Router();

//Importing database schemas
const schools = require('../models/schools');
const courses = require('../models/courses');

//Setting up middleware for parsing post request
router.use(express.json());
router.use(express.urlencoded({extended: true}));

//Handling the requests

//Rendering views for admin panel
router.get('/', (req, res)=>{
    res.render('admin');
});

router.get('/addcourse', (req, res)=>{
    res.render('addcourse');
});

router.get('/addpaper', (req, res)=>{
    res.render('addpaper');
});

router.post('/addschool', (req, res)=>{
    const newSchool = new schools({
        schoolName : req.body.name
    });
    console.log(newSchool);
    newSchool.save((err, savedSchool)=>{
    if(err) throw err;
    res.json(savedSchool);
    });
    
});

//Posting a new course
router.post('/addcourse/submit', (req, res)=>{
    
    
    const linkedSchool = req.body.school;
    const courseCode = req.body.courseCode;
    const courseName = req.body.courseName;
    
    if(typeof linkedSchool === "undefined" || typeof linkedSchool === "null"){
        //pass
    }
    else if(typeof linkedSchool === "string"){
        schools.updateOne({"schoolName": linkedSchool},
            {$push: {"courses": courseCode,"courseNames": courseName}},
            (err, numAffected)=>{
                if(err){
                    console.error(err);
                }
            }
        );
    }
    else {
        Array.from(linkedSchool).forEach((school)=>{
            
            schools.updateOne({"schoolName": school},
                {$push: {"courses": courseCode, "courseNames": courseName}},
                (err, numAffected)=>{
                    if(err){
                        console.error(err);
                    }
                }
            );
        });
    }
    
    
    courses.find({"courseCode": req.body.courseCode}).countDocuments((err, count)=>{
        if(count == 0){
            const newCourse = new courses({
                courseCode : req.body.courseCode,
                courseName : req.body.courseName,
            });
        
            newCourse.save((err, savedCourse)=>{
            res.json(savedCourse);
            });
        }
    
        else{
            res.send("Course already exists, Dattebayo!");
        }
    });
    

});


//Posting a new paper~
router.post('/addpaper/submit', (req, res)=>{
    //Update the document
    console.log("Reached here");
    courses.findOne({"courseCode": req.body.courseCode}).countDocuments((err, count)=>{
        if(err) {
            console.error(err);
        }
        else{
            if(count == 1){
                const examType = req.body.exam + 'Links'; 
                console.log(examType);
                courses.updateOne({courseCode: req.body.courseCode},
                    {$push: {[examType]: req.body.paperLink}},
                    (err, numAffected)=>{
                        if(err){
                            console.error(err);
                        }
                    }
                );
                res.send("It probably worked");
            }
            else{
                res.send("Thomas had never seen such a bullshit, this course doesnt exist");
            }
        }
    });

});






module.exports = router;