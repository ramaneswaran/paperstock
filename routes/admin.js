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

router.post('/addcourse/submit', async (req, res)=>{
    
    const schoolList = ["scope", 'site', 'sense', 'select', 'smec', 'sas', 'scheme', 'sce', 'sbst', 'vitbs', 'vsparc', 'ssl'];

    courses.findOne({"courseCode" : req.body.courseCode}, (err, course)=>{
        if(err) console.error(err);
    })
    const newCourse = new courses({
        courseCode : req.body.courseCode,
        courseName : req.body.courseName,
    });

    try{
        const savedCourse = await newCourse.save();
        res.json(savedCourse);
    }catch(err){
        res.json({message: err});
    }
    

    const linkedSchool = req.body.school;
    const courseCode = req.body.courseCode;


    linkedSchool.forEach((school)=>{
        schools.update({"schoolName": school},
        {$push: {"courses": courseCode}},
        (err, numAffected)=>{
            if(err){
                console.error(err);
            }
            else{
                console.log(numAffected);
            }
        });
    });
    

});






module.exports = router;