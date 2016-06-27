var mongoose = require("mongoose");

var TechnologySchema = new mongoose.Schema({
    name: {
        type: String
    }
});

var Technology = mongoose.model('Technology', TechnologySchema);

module.exports = {
    Technology: Technology
}
