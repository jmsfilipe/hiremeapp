var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    friends:[this],
    password: {
        type: String
    },
    score: {
        type: Number
    },
    email:{
        type: String, 
        unique: true
    }
});

var User = mongoose.model('User', UserSchema);

module.exports = {
    User: User
}
