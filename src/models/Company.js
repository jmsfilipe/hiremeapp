var mongoose = require("mongoose");

var CompanySchema = new mongoose.Schema({
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

var Company = mongoose.model('Company', CompanySchema);

module.exports = {
    Company: Company
}
