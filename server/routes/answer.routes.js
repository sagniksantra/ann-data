const express = require("express");
const router = express.Router();
const Answer = require("../models/Answer");

// Add a new answer
router.post("/answers", async (req, res) => {
  console.log(req.params);
  const { questionId } = req.params;
  const { answer } = req.body;

  console.log("questionId:", questionId);

  try {
    const newAnswer = new Answer({ questionId, answer });
    await newAnswer.save();

    res.json({ answer: newAnswer.answer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
