const cors = require('cors');
const express = require('express');
const rateLimit = require('./middleware/rateLimitMiddleware');
const errorHandler = require('./middleware/errorMiddleware');
const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:7800' }));
app.use(express.json({ limit: '1mb' }));
app.use(rateLimit({ max: 120 }));
app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'nexora-api' }));
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use(errorHandler);

module.exports = app;
