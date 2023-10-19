const mongoose = require("mongoose");
const Answer = require("./Answer");
const questionSchema = new mongoose.Schema({
  question: String,
  answers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Answer" }],
});

module.exports = mongoose.model("Question", questionSchema);
