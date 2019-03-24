var mongoose = require('mongoose');
var User = mongoose.model('User');
require('dotenv').load();
const verificationService = require('./../services/police-verification-service');

module.exports.list = function (req, res) {

    if (!req.payload._id) {
        res.status(401).json({
            message: "UnauthorizedError: private profile"
        });
    } else {
        let callback = function (info) {
            if (info) {
                res.status(200).json(info);
            } else {
                res.status(400).json({message: "Error occured"});
            }
        };
        verificationService.list(req, callback);
    }
};

module.exports.verifyUser = function (req, res) {

    if (!req.payload._id) {
        res.status(401).json({
            message: "UnauthorizedError: private profile"
        });
    } else {
        let callback = function (info) {
            if (info) {
                res.status(200).json(info);
            } else {
                res.status(400).json({message: "Error occured"});
            }
        };
        verificationService.update(req, callback);
    }
};

module.exports.deleteUser = function (req, res) {

    if (!req.payload._id) {
        res.status(401).json({
            message: "UnauthorizedError: private profile"
        });
    } else {
        let callback = function (info) {
            if (info) {
                res.status(200).json(info);
            } else {
                res.status(400).json({message: "Error occured"});
            }
        };
        verificationService.delete(req, callback);
    }
};