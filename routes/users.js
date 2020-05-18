const express = require('express');
const router = express.Router();

//Login Page
router.get('/login', function(req, res){
    res.send('Login')
})

//Register
router.get('/register', function(req, res){
    res.send('Register')
})

module.exports = router;