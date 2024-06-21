const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { ExcelEntry } = require('./db');

// Initialize express app
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API endpoint to receive and store Excel data
app.post('/api/save-excel-data', async (req, res) => {
    const { data } = req.body;

    try {
        await ExcelEntry.create({ data });
        res.status(200).json({ message: 'Data saved successfully!' });
    } catch (error) {
        console.error('Error saving data to MySQL:', error);
        res.status(500).json({ message: 'Failed to save data' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
