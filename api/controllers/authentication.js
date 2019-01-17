var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.register = function (req, res) {

    // if(!req.body.name || !req.body.email || !req.body.password) {
    //   sendJSONresponse(res, 400, {
    //     "message": "All fields required"
    //   });
    //   return;
    // }

    var user = new User();

    user.name.firstName = req.body.name.firstName;
    user.name.lastName = req.body.name.lastName;
    user.email = req.body.email;
    user.ssn = req.body.ssn;
    user.phoneNo = req.body.phoneNo;
    user.role = req.body.role;
    user.accountStatus = req.body.accountStatus;
    user.address.street = req.body.address.street;
    user.address.addressLine2 = req.body.address.addressLine2;
    user.address.state = req.body.address.state;
    user.address.zip = req.body.address.zip;
    user.address.country = req.body.address.country;
    user.address.city = req.body.address.city;
    user.setPassword(req.body.password);
    user.save(function (err) {
        if (err) {
            res.status(500).json(err);
        } else {
            var token;
            token = user.generateJwt();
            res.status(200);
            res.json({
                "token": token
            });
        }
    });
};

module.exports.login = function (req, res) {

    // if(!req.body.email || !req.body.password) {
    //   sendJSONresponse(res, 400, {
    //     "message": "All fields required"
    //   });
    //   return;
    // }

    passport.authenticate('local', function (err, user, info) {
        var token;

        // If Passport throws/catches an error
        if (err) {
            res.status(404).json(err);
            return;
        }

        // If a user is found
        if (user) {
            token = user.generateJwt();
            res.status(200);
            res.json({
                "token": token
            });
        } else {
            // If user is not found
            res.status(401).json(info);
        }
    })(req, res);

};