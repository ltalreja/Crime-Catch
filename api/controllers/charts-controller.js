'use strict';

var mongoose = require('mongoose');
var crime_incidents_boston = mongoose.model('crime_incidents_boston');
//var mapservice = require('../api/services/map-service');


module.exports.getalldata=function(req,res){
    console.log(req.query);
    crime_incidents_boston.find()
        .exec(function (err, crime_incidents_boston) {
        if (err)
            res.json(err);
        else if(crime_incidents_boston)
            res.json(crime_incidents_boston);
    });
};