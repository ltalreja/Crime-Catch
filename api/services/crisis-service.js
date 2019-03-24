var mongoose = require('mongoose');
var Crisis = mongoose.model('emCrisis');
require('dotenv').load();

let throwError = function (error) {
    if (error) {
        throw Error(error);
    }
};

module.exports.add = function (user, payload, callbackCrisis) {

    let crisis = new Crisis();
    crisis.user = user;
    crisis.Lat = payload.Lat;
    crisis.Long = payload.Long;
    crisis.Location = payload.Location;
    crisis.offenceType = payload.offenceType;
    crisis.offenceDescription = payload.offenceDescription;
    crisis.save(function (err) {
        if (err) {
            throwError({message: err});
        } else {
            callbackCrisis(crisis);
        }
    });
};