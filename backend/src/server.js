/**
 * Backend Server Entry Point: Configures Express app, security middleware, and routes
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const skillRoutes = require('./routes/skillRoutes');
const projectRoutes = require('./routes/projectRoutes');
const educationRoutes = require('./routes/educationRoutes');
const experienceRoutes = require('./routes/experienceRoutes');
const achievementRoutes = require('./routes/achievementRoutes');
const messageRoutes = require('./routes/messageRoutes');
const settingRoutes = require('./routes/settingRoutes');
const errorHandler = require('./middleware/errorMiddleware');

const app = express();

app.use(helmet({
  crossOriginResourcePolicy: false,
}));

app.use(cors({
  origin: (origin, callback) => {
    callback(null, true);
  },
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { success: false, message: 'Too many requests, please try again later.' }
});
app.use('/api', limiter);

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api', messageRoutes);
app.use('/api/settings', settingRoutes);

app.get('/', (req, res) => res.json({ success: true, message: 'Shazid Ahmed Personal Portfolio REST API Server Running' }));

app.use(errorHandler);

const autoSeed = require('./database/autoSeed');

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Backend REST API server running on port ${PORT}`);
  await autoSeed();
});
