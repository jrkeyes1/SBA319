require('dotenv').config();
const express = require('express');
const connectDB = require('./db/mongoose');
const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the StyleKey App');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});