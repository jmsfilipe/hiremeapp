var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    name: { type: String },
    friends: [this],
    password: { type: String },
    blocked: { type: Boolean, default: false },
    email:{ type: String, unique: true },
    notifications: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notifications'
    },
    gender: { type: String, default: 'M' },

    score: { type: Number, default: 0 },
    area: {
      web: { type: Number, default: 0 },
      database: { type: Number, default: 0 }
    },
    tech: {
      javascript: { type: Number, default: 0 },
      postgres: { type: Number, default: 0 }
    },
    general: {
      windows: { type: Number, default: 0 },
      word: { type: Number, default: 0 },
      excel: { type: Number, default: 0 },
      powerpoint: { type: Number, default: 0 },
      gmail: { type: Number, default: 0 },
      chrome: { type: Number, default: 0 },
      android: { type: Number, default: 0 }
    },
    company: {
      google: { type: Number, default: 0 },
      yahoo: { type: Number, default: 0 },
      microsoft: { type: Number, default: 0 },
      outsystems: { type: Number, default: 0 },
      adobe: { type: Number, default: 0 }
    }

});


var User = mongoose.model('User', UserSchema);

module.exports = {
    User: User
}
