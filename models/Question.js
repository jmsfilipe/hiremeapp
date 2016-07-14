var mongoose = require("mongoose");

var QuestionSchema = new mongoose.Schema({
  question: [String],
  code_sample: {
    language: String,
    content: String
  },
  explanation: String,
  level: Number,
  answers: [
    {
      text: [String],
      correct: Boolean
    }
  ]
});

var Question = mongoose.model('Question', QuestionSchema);

module.exports = {
    Question: Question
}
