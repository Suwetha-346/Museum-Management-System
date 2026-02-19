const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup storage for uploaded images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Append extension
    },
});

// Initialize upload
const upload = multer({ storage: storage });

// MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'suwetha',  // Change this to your MySQL username
    password: 'suwetha', // Change this to your MySQL password
    database: 'museum' // Your database name
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Database connection failed: ', err.stack);
        return;
    }
    console.log('Connected to database.');
});

// Endpoint to add a new artifact
app.post('/api/artifacts', upload.single('image'), (req, res) => {
    const { name, description, category, acquisition_date, location, status } = req.body;
    const imagePath = req.file ? req.file.path : null; // Get uploaded image path

    const query = 'INSERT INTO artifacts (name, description, category, acquisition_date, location, status, image) VALUES (?, ?, ?, ?, ?, ?, ?)';
    connection.query(query, [name, description, category, acquisition_date, location, status, imagePath], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Artifact added successfully!', artifactId: results.insertId });
    });
});

// Endpoint to get all artifacts
app.get('/api/artifacts', (req, res) => {
    const query = 'SELECT * FROM artifacts';
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
