var mongoose = require('mongoose');
var User = mongoose.model('User');
require('dotenv').load();
const mailService = require('./../services/mail-service');
const crisisService = require('./../services/crisis-service');

module.exports.sosMail = function (req, res) {
    if (!req.payload._id) {
        res.status(401).json({
            message: "UnauthorizedError: private profile"
        });
    } else {
        User.findById(req.payload._id)
            .exec(function (err, user) {
                if (user) {
                    let payload = req.body;
                    let resmessage = new Array();
                    let callbackCrisis = function (info) {
                        if (info) {
                            resmessage.push({crisis: info});
                        } else {
                            res.status(400).json({message: "Error occured"});
                        }
                    };
                    crisisService.add(user, payload, callbackCrisis);

                    let callback = function (info) {
                        if (info) {
                            resmessage.push({email: info});
                            res.status(200).json({message: resmessage});
                        } else {
                            res.status(400).json({message: "Error occured"});
                        }
                    };
                    mailService.sendMail(user, payload, callback);
                } else {
                    res.status(400).json({message: "Invalid request data"});
                }
            });
    }
};