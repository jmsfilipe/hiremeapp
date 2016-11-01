var mongoose = require("mongoose");

var LocationSchema = new mongoose.Schema({
    ip: {  type: String   },
    city: {  type: String   },
    region: {  type: String   },
    details: {  type: String   },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

var Location = mongoose.model('Location', LocationSchema);

module.exports = {
    Location: Location
}
