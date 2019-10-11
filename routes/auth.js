const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const {registerValidation, loginValidation} = require('../validate');


  

router.post('/register',async (req,res)=>{

    //Validating data
    const { error, value } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    //Check if user already exists

    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exists');

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    //Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
    });
    try{
        const savedUser = await user.save();
        res.send(savedUser);
    } catch(err){
        res.status(400).send(err);
    }

  
    
});

router.post('/login', async (req, res)=>{
    const {error} = loginValidation(req.body);

    if (error) return res.status(400).send(error.details[0].message);
    
    //Check if user already exists
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Wrong email');

    //Password is correct

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return status(400).send('Password is wrong')

    //Create and assign token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token); 
    res.send('Logged in');
});
module.exports = router;