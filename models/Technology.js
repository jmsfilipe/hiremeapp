var mongoose = require("mongoose");

var TechnologySchema = new mongoose.Schema({
    name: {  type: String   },
    type: {  type: String, default: 'Technology' },
    questions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question'
        }
    ]
});

var Technology = mongoose.model('Technology', TechnologySchema);

module.exports = {
    Technology: Technology
}
