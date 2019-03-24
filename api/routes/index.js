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
var crtlCrime =require('../controllers/map-controller');
var crtlCrisis = require('../controllers/crisis-controller');
var crtlVerification = require('../controllers/verification-controller');
var crtlChart =require('../controllers/charts-controller');
// profile
router.get('/profile', auth, ctrlProfile.profileRead);
router.put('/profile', auth, ctrlProfile.profileUpdate);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

//maps
router.get('/crimes', crtlCrime.getCrimes);
router.get('/streets',crtlCrime.getallstreets);
router.get('/offense',crtlCrime.getalloffense);

//maps
router.get('/allData',crtlChart.getalldata);

router.post('/crisis', auth, crtlCrisis.sosMail);

router.get('/users', auth, crtlVerification.list);
router.put('/users', auth, crtlVerification.verifyUser);
router.delete('/users', auth, crtlVerification.deleteUser);

module.exports = router;