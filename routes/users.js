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

module.exports = router;