var mongoose = require("mongoose");

var WhoseOnlineSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
});

WhoseOnlineSchema.index( { "timestamp": 1 }, { expireAfterSeconds: 300 } );

var WhoseOnline = mongoose.model('WhoseOnline', WhoseOnlineSchema);

module.exports = {
    WhoseOnline: WhoseOnline
}
