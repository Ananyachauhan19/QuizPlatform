const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /api/login
router.post('/login', async (req, res) => {
  const { name, email, studentId, course } = req.body;
  if (!name || !email || !studentId || !course) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  let user = await User.findOne({ email, studentId });
  if (!user) {
    user = new User({ name, email, studentId, course });
    await user.save();
  }

  res.json({ message: 'Login successful', user });
});

module.exports = router;
