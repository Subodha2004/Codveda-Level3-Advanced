// Load environment variables from .env file
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Debug: check if MONGO_URI is being read
console.log("MONGO_URI:", process.env.MONGO_URI);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected "))
.catch((err) => console.log("MongoDB connection error :", err));

// Basic route to test server
app.get("/", (req, res) => {
    res.send("Backend Server Running ");
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} `);
});