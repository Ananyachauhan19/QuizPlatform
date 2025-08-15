const mongoose = require('mongoose');

const attemptSchema = new mongoose.Schema({
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  studentId: { type: String, required: true },
  studentName: { type: String },
  startedAt: { type: Date, default: Date.now },
  endedAt: { type: Date },
  answers: [
    {
      questionText: String,
      selected: String,
      correct: String,
      isCorrect: Boolean
    }
  ],
  score: { type: Number, default: 0 },
});

module.exports = mongoose.model('Attempt', attemptSchema);
