const express = require('express');
const router = express.Router();

//Importing database schemas
const schools = require('../models/schools');
const courses = require('../models/courses');

//Setting up middleware for parsing post request
router.use(express.json());
router.use(express.urlencoded({extended: true}));

//Handling the requests
router.get('/', (req, res)=>{
    res.render('admin');
});

router.get('/addcourse', (req, res)=>{
    res.render('addcourse');
});

router.get('/addpaper', (req, res)=>{
    res.render('addpaper');
});

router.get('/linkcourse', (req, res)=>{
    res.render('linkcourse')
});

router.get('/schools', (req, res)=>{
    console.log('This got triggered');
    const schoolList = ["scope", 'site', 'sense', 'select', 'smec', 'sas', 'scheme', 'sce', 'sbst', 'vitbs', 'vsparc', 'ssl'];
    const list = []
    
    schoolList.forEach((name)=>{
        schools.find({"schoolName": name}, (err, school)=>{
        console.log(school);
        });
    });


});

router.post('/addcourse/submit', (req, res)=>{
    
    
    const linkedSchool = req.body.school;
    const courseCode = req.body.courseCode;

    if(typeof linkedSchool === "undefined" || typeof linkedSchool === "null"){
        //pass
    }
    else if(typeof linkedSchool === "string"){
        schools.updateOne({"schoolName": linkedSchool},
            {$push: {"courses": courseCode}},
            (err, numAffected)=>{
                if(err){
                    console.error(err);
                }
            }
        );
    }
    else {
        Array.from(linkedSchool).forEach((school)=>{
            console.log("Here, wohoo");
            schools.updateOne({"schoolName": school},
                {$push: {"courses": courseCode}},
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

router.post('/addpaper/submit', (req, res)=>{
    //Update the document
    courses.findOne({"courseCode": req.body.courseCode}).countDocuments((err, count)=>{
        console.log("The count is "+count+" for courseCode: "+req.body.courseCode);
        if(err) {
            console.error(err);
        }
        else{
            if(count == 1){
                console.log("Since count was 1 i am here")
                console.log("This link is "+req.body.paperLink)
                courses.updateOne({"courseCode": req.body.courseCode},
                    {$push: {"courseLinks": req.body.paperLink}},
                    (err, numAffected)=>{
                        if(err){
                            console.error(err);
                        }
                    }
                );
            }
            else{
                res.send("Thomas had never seen such a bullshit, this course doesnt exist");
            }
        }
    });

});






module.exports = router;