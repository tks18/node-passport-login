const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

//User Model
const User = require("../models/user") 

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
        // Validation Passes
        User.findOne({email: email}).then(function(user) {
            if (user){
                //User Exists
                errors.push({msg: 'User Already Exists Try Login'});
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            } else {
                const newUser = new User({
                    name: name,
                    email: email,
                    password: password,
                })

                //Hash Password
                bcrypt.genSalt(10, function(error, salt){
                    bcrypt.hash(newUser.password, salt, function(error, hash){
                        if(error){
                            throw error;
                        }
                        // Set Password to Hash
                        newUser.password = hash;
                        // Save User
                        newUser.save().then(user => {
                            req.flash('success_msg', 'You are Now Registered and Can Log in')
                            res.redirect('/users/login')
                        }).catch(error => {
                            console.log(error);
                        });
                    })
                })
            }
        })
    }
})

//Login Handle
router.post('/login', function(req, res, next){
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true,
    })(req, res, next);
});

//Logout Handle
router.get('/logout', function(req, res){
    req.logOut();
    req.flash('success_msg', 'You are Logged Out');
    res.redirect('/users/login');
})

module.exports = router;