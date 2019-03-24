var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var userSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        }
    },
    ssn: {
        type: Number,
        unique: true,
        required: true
    },
    phoneNo: {
        type: Number,
        unique: true,
        required: true
    },
    role: {
        type: String,
        enum: ['User', 'Police', 'NewsReporter']
    },
    accountStatus: {
        type: String,
        enum: ['New', 'Verified']
    },
    hash: String,
    salt: String,
    address: {
        street: {
            type: String,
            required: true
        },
        addressLine2: String,
        city: {
            type: String,
            required: true
        },
        zip: {
            type: Number,
            required: true,
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        }
    },
    createdDate: {
        type: Date,
        default: Date.now()
    },
    modifiedDate: {
        type: Date,
        default: Date.now()
    },
    emergencyContact: {
        name: String,
        email: String
    }
});

userSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

userSchema.methods.generateJwt = function () {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        ssn: this.ssn,
        phoneNo: this.phoneNo,
        role: this.role,
        exp: parseInt(expiry.getTime() / 1000),
    }, process.env.SECRET_KEY);
};

module.exports = mongoose.model('User', userSchema);