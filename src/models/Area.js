var mongoose = require("mongoose");

var AreaSchema = new mongoose.Schema({
  name: {
    type: String
  }
});

var Area = mongoose.model('Area', AreaSchema);

module.exports = {
  Area: Area
}
