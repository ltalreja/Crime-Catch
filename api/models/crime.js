const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let crime_incidents_boston = new Schema({
    DAY_OF_WEEK: String,
    DISTRICT: String,
    HOUR: String,
    INCIDENT_NUMBER:String,
    Lat: String,
    Location: String,
    Long:String,
    MONTH: String,
    OCCURRED_ON_DATE: String,
    OFFENSE_CODE: String,
    OFFENSE_CODE_GROUP:String,
    OFFENSE_DESCRIPTION: String,
    REPORTING_AREA: String,
    STREET: String,
    UCR_PART: String,
    YEAR: String
},{
    collection:'crime_incidents_boston'
});

mongoose.model('crime_incidents_boston', crime_incidents_boston);