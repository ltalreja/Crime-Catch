var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.profileRead = function (req, res) {
    if (!req.payload._id) {
        res.status(401).json({
            "message": "UnauthorizedError: private profile"
        });
    } else {
        User
            .findById(req.payload._id)
            .exec(function (err, user) {
                if (user) {
                    res.status(200).json(err);
                } else {
                    res.status(400).json({"message": "Invalid request data"});
                }
            });
    }
};

module.exports.profileUpdate = function (req, res) {
    if (!req.payload._id) {
        res.status(401).json({
            "message": "UnauthorizedError: private profile"
        });
    } else {
        let user = req.body;
        user.modifiedDate = Date.now();
        User
            .findOneAndUpdate({_id: req.payload._id}, user, {new: true})
            .exec(function (err, user) {
                if (user) {
                    res.status(200).json(user);
                } else {
                    res.status(400).json({"message": "Invalid request data"});
                }
            });
    }
};
