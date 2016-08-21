var mongoose = require("mongoose");

var AreaSchema = new mongoose.Schema({
    name: {  type: String   },
    type: {  type: String, default: 'Area' },
    technologies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Technology'
        }
    ]
});

var Area = mongoose.model('Area', AreaSchema);

module.exports = {
    Area: Area
}
