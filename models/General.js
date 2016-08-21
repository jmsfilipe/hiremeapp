var mongoose = require("mongoose");

var GeneralSchema = new mongoose.Schema({
    name: {  type: String   },
    type: {  type: String, default: 'General' },
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
