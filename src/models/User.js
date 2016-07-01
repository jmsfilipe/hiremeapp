var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    name: { type: String },
    friends:[this],
    password: { type: String },
    score: { type: Number, default: 0 },
    email:{ type: String, unique: true },

    answered_questions:{
        technology_score: [
            {
                type: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Technology'
                },
                value: { type: Number, default: 0 }
            }
        ],
        area_score: [
            {
                type: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Area'
                },
                value: { type: Number, default: 0 }
            }
        ],
        company_score: [
            {
                type: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Company'
                },
                value: { type: Number, default: 0 }
            }
        ]
    },
    correct_questions: {
        technology_score: [
            {
                type: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Technology'
                },
                value: { type: Number, default: 0 }
            }
        ],
        area_score: [
            {
                type: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Area'
                },
                value: { type: Number, default: 0 }
            }
        ],
        company_score: [
            {
                type: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Company'
                },
                value: { type: Number, default: 0 }
            }
        ]
    }
});


var User = mongoose.model('User', UserSchema);

module.exports = {
    User: User
}
