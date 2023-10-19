const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  answer: String,
});

module.exports = mongoose.model("Answer", answerSchema);
