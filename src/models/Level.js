var mongoose = require("mongoose");

var LevelSchema = new mongoose.Schema({
  name: {
    type: String
  }
});

module.exports = mongoose.model('Level', LevelSchema);
