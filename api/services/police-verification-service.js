const mongoose = require('mongoose');
require('dotenv').load();
const User = mongoose.model('User');

let throwError = function (error) {
    if (error) {
        throw Error(error);
    }
};

module.exports.list = function (req, callback) {
    User
        .find(req.query)
        .exec(function (err, user) {
            if (err) {
                throwError({message: err});
            } else if (user) {
                callback(user);
            }
        });
};


module.exports.update = function (req, callback) {
    const userInfo = req.body;
    User
        .findOneAndUpdate({_id: userInfo._id}, userInfo, {new: true})
        .exec(function (err, user) {
            if (err) {
                throwError({message: err});
            } else if (user) {
                callback(user);
            }
        });
};


module.exports.delete = function (req, callback) {
    User
        .remove(req.query)
        .exec(function (err, user) {
            if (err) {
                throwError({message: err});
            } else if (user) {
                callback(user);
            }
        });
};