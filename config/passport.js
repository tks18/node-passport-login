const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//User Model - Load
const User = require('../models/user');

module.exports = function(passport){
    passport.use(
        new localStrategy({
            usernameField: 'email'
        },
        function(email, password, done){
            //Match User
            User.findOne({email: email}).then(function(user){
                if(!user){
                    return done(null, false, {message: 'That Email is Not Registered'});
                }
                //Match  Passwords
                bcrypt.compare(password, user.password, function(error, isMatch){
                    if(error){
                        throw error;
                    }
                    if(isMatch){
                        return done(null, user)
                    } else {
                        return done(null, false, {message: 'Password Incorrect'});
                    }
                });
            }).catch(error => console.log(error));
        })
    );
    passport.serializeUser(function(user, done){
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done){
        User.findById(id, function(error, user){
            done(error, user);
        });
    });
}