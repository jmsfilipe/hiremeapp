var mongoose = require("mongoose");

var SessionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
});

SessionSchema.index( { "timestamp": 1 }, { expireAfterSeconds: 300 } );

var Session = mongoose.model('Session', SessionSchema);

module.exports = {
    Session: Session
}
