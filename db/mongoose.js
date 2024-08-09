const { default: mongoose } = require("mongoose");

// Global configuration
const mongoURI = process.env.MONGO_URI;
const db = mongoose.connection;

// Connect to MongoDB
mongoose.connect(mongoURI);

db.once('open', () => {
    console.log('Connected to MongoDB');
});

db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

module.exports = db;
