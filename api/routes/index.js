var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
require('dotenv').load();
var auth = jwt({
    secret: `${process.env.SECRET_KEY}`,
    userProperty: 'payload'
});
console.log(auth);
var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');

// profile
router.get('/profile', auth, ctrlProfile.profileRead);
router.put('/profile', auth, ctrlProfile.profileUpdate);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;