const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const Attempt = require('../models/Attempt');
// Get all quizzes with participation summary (for admin dashboard)
router.get('/admin/participation', async (req, res) => {
  try {
    const quizzes = await Quiz.find().sort({ startTime: -1 });
    // For each quiz, count attempts and get top score
    const data = await Promise.all(
      quizzes.map(async (quiz) => {
        const attempts = await Attempt.find({ quiz: quiz._id });
        const topScore = attempts.length > 0 ? Math.max(...attempts.map(a => a.score)) : 0;
        return {
          _id: quiz._id,
          title: quiz.title,
          startTime: quiz.startTime,
          endTime: quiz.endTime,
          totalAttempts: attempts.length,
          topScore
        };
      })
    );
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all attempts for a quiz (sorted by score desc)
router.get('/:id/attempts', async (req, res) => {
  try {
    const attempts = await Attempt.find({ quiz: req.params.id }).sort({ score: -1 });
    res.json(attempts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Submit a quiz attempt
router.post('/:id/attempt', async (req, res) => {
  try {
    const { studentId, studentName, answers } = req.body;
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    // Calculate score and answer stats
    let correct = 0, wrong = 0, unattempted = 0;
    const answerDetails = quiz.questions.map((q, idx) => {
      const userAns = answers[idx];
      if (!userAns) { unattempted++; return { questionText: q.questionText, selected: '', correct: q.answer, isCorrect: false }; }
      if (userAns === q.answer) { correct++; return { questionText: q.questionText, selected: userAns, correct: q.answer, isCorrect: true }; }
      wrong++;
      return { questionText: q.questionText, selected: userAns, correct: q.answer, isCorrect: false };
    });
    const score = correct; // 1 mark per correct
    const attempt = new Attempt({
      quiz: quiz._id,
      studentId,
      studentName,
      startedAt: new Date(),
      endedAt: new Date(),
      answers: answerDetails,
      score
    });
    await attempt.save();
    res.status(201).json({ score, correct, wrong, unattempted, total: quiz.questions.length, attempt });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Get a single quiz by ID
router.get('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new quiz (admin)
router.post('/', async (req, res) => {
  try {
    const { title, description, questions, duration, startTime, endTime, visibility } = req.body;
    if (!title || !startTime || !duration) {
      return res.status(400).json({ message: 'Title, startTime, and duration are required.' });
    }
    const quiz = new Quiz({
      title,
      description,
      questions: questions || [],
      duration,
      startTime,
      endTime,
      visibility: visibility || 'public',
    });
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
    // Show quizzes where endTime is in the future OR endTime is null (no end time set)
    const quizzes = await Quiz.find({ $or: [ { endTime: { $gte: now } }, { endTime: null } ] }).sort({ startTime: 1 });
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
