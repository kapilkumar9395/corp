const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const passport = require('passport');
router.post('/authenticate', (req, res, next) => {
    let user = {
        username: req.body.username,
        password: req.body.password
    };

    User.authenticateUser(user)
    .then((userData) => {
        const token = jwt.sign({payload:userData}, config.secret, {expiresIn: '1h'});
        userData = {
            id: userData._id,
            firstName: userData.firstName,
            lastName: userData.lastName,
            username: userData.username,
            token: "JWT "+token
        };
        res.json({userMessage: "Authorized", user: userData, success: true});
    })
    .catch((rej) => {
        res.json({userMessage: rej, success: false});
    });
});

router.post('/register', (req, res, next) => {
    let newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password
    });

    User.userRegister(newUser)
    .then(function(data){
        console.log(data);
        res.json({userMessage:'User registered successfully', success: "true"});
    })
    .catch(function(err){
        res.json({userMessage:err, success: "false"});
    });
});

router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.json(req.user);
});

module.exports = router;
