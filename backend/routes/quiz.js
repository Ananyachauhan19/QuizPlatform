const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');

// Create a new quiz (admin)
router.post('/', async (req, res) => {
  try {
    const { title, description, startTime, endTime } = req.body;
    if (!title || !startTime || !endTime) {
      return res.status(400).json({ message: 'Title, startTime, and endTime are required.' });
    }
    const quiz = new Quiz({ title, description, startTime, endTime });
    await quiz.save();
    res.status(201).json(quiz);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all scheduled quizzes (for student dashboard)
router.get('/', async (req, res) => {
  try {
    const now = new Date();
    const quizzes = await Quiz.find({ endTime: { $gte: now } }).sort({ startTime: 1 });
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
