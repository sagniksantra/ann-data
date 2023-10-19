const express = require("express");
const router = express.Router();
const Question = require("../models/Question");

// Create a new question
router.post("/", async (req, res) => {
  try {
    const question = new Question({ question: req.body.question });
    await question.save();
    console.log("here");
    res.json(question);
  } catch (error) {
    res.json({ message: error.message });
  }
});

// Get all questions
router.get("/", async (req, res) => {
  try {
    const questions = await Question.find().populate("answers");
    console.log("here1");
    res.json(questions);
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;
