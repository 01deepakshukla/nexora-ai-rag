const cors = require('cors');
const express = require('express');
const path = require('path');
const rateLimit = require('./middleware/rateLimitMiddleware');
const errorHandler = require('./middleware/errorMiddleware');
const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');

const app = express();
const clientDist = path.resolve(__dirname, '../client/dist');
const allowedOrigins = (process.env.CLIENT_URL || '')
	.split(',')
	.map((origin) => origin.trim())
	.filter(Boolean);

app.use(cors({
	origin: (origin, callback) => {
		if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
			return callback(null, true);
		}

		return callback(new Error('Origin not allowed by CORS'));
	},
}));
app.use(express.json({ limit: '1mb' }));
app.use(rateLimit({ max: 120 }));

app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'nexora-api' }));

app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use(express.static(clientDist));
app.get('*', (req, res, next) => {
	if (req.path.startsWith('/api/')) {
		return next();
	}

	return res.sendFile(path.join(clientDist, 'index.html'));
});
app.use(errorHandler);

module.exports = app;

