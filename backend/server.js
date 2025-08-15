const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const quizRoutes = require('./routes/quiz');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

//Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://ananya:ananya%40123@cluster.eily5zw.mongodb.net/quiz?retryWrites=true&w=majority&appName=Cluster', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));


app.use('/api', authRoutes);
app.use('/api/quizzes', quizRoutes);

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // When a quiz starts
  socket.on('start_quiz', ({ quizId, duration }) => {
    console.log(`Quiz ${quizId} started for ${duration} seconds`);

    let remainingTime = duration;

    // Send initial time to all clients in the quiz room
    io.emit('timer_update', remainingTime);

    const timerInterval = setInterval(() => {
      remainingTime--;
      io.emit('timer_update', remainingTime);

      if (remainingTime <= 0) {
        clearInterval(timerInterval);
        io.emit('time_up', { quizId });
        console.log(`Time up for quiz ${quizId}`);
      }
    }, 1000);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});
app.listen(5000, () => console.log('Server running on port 5000'));
