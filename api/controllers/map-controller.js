'use strict';

var mongoose = require('mongoose');
var crime_incidents_boston = mongoose.model('crime_incidents_boston');

// /**
//  * Returns a list of crimes 
//  * 
//  *
//  * @param {request} {HTTP request object} based on query params
//  * @param {response} {HTTP response object}
//  */

module.exports.getCrimes=function(req,res){
   
    crime_incidents_boston.find(req.query)
        .exec(function (err, crime_incidents_boston) {
        if (err)
            res.json(err);
        else if(crime_incidents_boston)
            res.json(crime_incidents_boston);
    });
};

module.exports.getalldata=function(req,res){
   
    crime_incidents_boston.find()
        .exec(function (err, crime_incidents_boston) {
        if (err)
            res.json(err);
        else if(crime_incidents_boston)
            res.json(crime_incidents_boston);
    });
};

// /**
//  * Returns a list of crimes 
//  * 
//  *
//  * @param {request} {HTTP request object} based on streets
//  * @param {response} {HTTP response object} return all unique STREET
//  */

module.exports.getallstreets=function(req,res){
  
    crime_incidents_boston.distinct("STREET")
        .exec(function (err, crime_incidents_boston) {
          
        if (err)
            res.json(err);
        else if(crime_incidents_boston)
            res.json(crime_incidents_boston);
    });
};


// /**
//  * Returns a list of crimes 
//  * 
//  *
//  * @param {request} {HTTP request object} based on OFFENSE_CODE_GROUP
//  * @param {response} {HTTP response object} return all unique OFFENSE_CODE_GROUP
//  */

module.exports.getalloffense=function(req,res){
  
    crime_incidents_boston.distinct("OFFENSE_CODE_GROUP")
        .exec(function (err, crime_incidents_boston) {
        if (err)
            res.json(err);
        else if(crime_incidents_boston)
            res.json(crime_incidents_boston);
    });
};

