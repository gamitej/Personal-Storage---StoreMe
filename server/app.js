const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(morgan('dev')); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req, res) => {
    res.status(200).json({
        message: "Google Drive Clone API is running",
        version: "1.0.0"
    });
});

// Error Handler 
app.use((err, _req, res, _next) => {
    console.error(err.stack);
    res.status(500).json({
        error: "Something went wrong!",
        message: err.message
    });
});

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;