require('dotenv').config();

const app = require('./app');
const connectDatabase = require('./config/database');

const port = process.env.PORT;
const requiredEnv = ['MONGO_URI', 'JWT_SECRET', 'GEMINI_API_KEY'];
if (process.env.NODE_ENV === 'production') {
  requiredEnv.push('CLIENT_URL');
}

const missingEnv = requiredEnv.filter((name) => !process.env[name]);
if (!port || missingEnv.length > 0) {
  console.error(`Missing required environment variables: ${[
    ...(!port ? ['PORT'] : []),
    ...missingEnv,
  ].join(', ')}`);
  process.exit(1);
}

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Nexora API listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  });

