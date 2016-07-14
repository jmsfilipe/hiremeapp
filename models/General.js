var mongoose = require("mongoose");

var GeneralSchema = new mongoose.Schema({
    name: {
        type: String
    },
    questions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question'
        }
    ]
});

var General = mongoose.model('General', GeneralSchema);

module.exports = {
    General: General
}
