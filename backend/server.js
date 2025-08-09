const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const quizRoutes = require('./routes/quiz');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://ananya:ananya%40123@cluster.eily5zw.mongodb.net/quiz?retryWrites=true&w=majority&appName=Cluster');


app.use('/api', authRoutes);
app.use('/api/quizzes', quizRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
