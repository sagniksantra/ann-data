const express = require("express");
const router = express.Router();
const Answer = require("../models/Answer");

// Add a new answer
router.post("/:questionId", async (req, res) => {
  const { questionId } = req.params;
  const { answer } = req.body;

  try {
    const newAnswer = new Answer({ questionId, answer });
    await newAnswer.save();

    res.json({ answer: newAnswer.answer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
