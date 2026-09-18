const mongoose = require('mongoose');

async function connectDatabase() {
  if (!process.env.MONGO_URI) {
    console.log('MONGO_URI is not set; starting without database persistence.');
    return;
  }

  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB connected.');
}

module.exports = connectDatabase;

