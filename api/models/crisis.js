const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var User = mongoose.model('User');

let emCrisis = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: User
    },
    Lat: String,
    Long: String,
    Location: String,
    occurredOnDate: {
        type: Date,
        default: Date.now()
    },
    offenceType: String,
    offenceDescription: String,
}, {
    collection: 'emCrisis'
});

mongoose.model('emCrisis', emCrisis);