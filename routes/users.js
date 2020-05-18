const express = require('express');
const router = express.Router();

//Login Page
router.get('/login', function(req, res){
    res.render('login')
})

//Register
router.get('/register', function(req, res){
    res.render('register')
})

//Register Handle
router.post('/register', function(req, res){
    const {name ,email, password, password2 } = req.body;
    let errors = [];

    //Check Required Fields
    if(!name || !email || !password || !password2){
        errors.push({msg: 'Please Fill in all the Details'});
    }

    //Check Passwords Match
    if(password !== password2){
        errors.push({msg: 'Passwords do Not Match'});
    }

    //Check Passwords Length
    if(password.length < 6){
        errors.push({msg: 'Password Should be Atlease 6 Characters'});
    }

    if(errors.length > 0){
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        })
    }else {
        res.send('Pass');
    }
})

module.exports = router;