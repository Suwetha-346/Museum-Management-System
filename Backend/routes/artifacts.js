const express = require('express');
const multer = require('multer');
const mysql = require('mysql');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'artifact_db'
});

db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected...');
});

// Multer setup for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  // Save file with timestamp
    }
});
const upload = multer({ storage });

// API route to add artifact
router.post('/', upload.single('image'), (req, res) => {
    const { name, description, category, acquisition_date, location, status } = req.body;
    const imagePath = `/uploads/${req.file.filename}`;

    const query = `INSERT INTO artifacts (name, description, category, acquisition_date, location, status, image_path)
                   VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.query(query, [name, description, category, acquisition_date, location, status, imagePath], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.status(201).json({ message: 'Artifact added successfully!' });
    });
});

// API route to get all artifacts
router.get('/', (req, res) => {
    db.query('SELECT * FROM artifacts', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.json(results);
    });
});

// API route to delete an artifact
router.delete('/:id', (req, res) => {
    const artifactId = req.params.id;

    // Find image path first
    db.query('SELECT image_path FROM artifacts WHERE id = ?', [artifactId], (err, result) => {
        if (err || result.length === 0) {
            return res.status(500).json({ error: 'Artifact not found or error in deletion.' });
        }

        const imagePath = result[0].image_path;

        // Delete the artifact from the database
        db.query('DELETE FROM artifacts WHERE id = ?', [artifactId], (err, result) => {
            if (err) {
                return res.status(500).json({ error: err });
            }

            // Remove image from filesystem
            fs.unlink(path.join(__dirname, '..', imagePath), (err) => {
                if (err) {
                    console.error('Error deleting image:', err);
                }
            });

            res.status(200).json({ message: 'Artifact deleted successfully!' });
        });
    });
});

module.exports = router;
