var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    name: { type: String },
    friends:[this],
    password: { type: String },
    blocked: { type: Boolean, default: false },
    score: { type: Number, default: 0 },
    email:{ type: String, unique: true },
    gender: { type: String, default: 'M' },
    answered_questions:[
          {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Question'
          }
    ],
    correct_questions:[
        {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Question'
          }
    ],
});


var User = mongoose.model('User', UserSchema);

module.exports = {
    User: User
}
