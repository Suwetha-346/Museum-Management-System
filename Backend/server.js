const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path'); // Import for serving static files
const artifactRoutes = require('./routes/artifacts');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads')); // Serve uploaded images
app.use(express.static('public')); // Serve static files from 'public' folder

// Route for artifact API
app.use('/api/artifacts', artifactRoutes);

// Serve index.html at the root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Catch-all route to handle incorrect paths
app.use((req, res) => {
    res.status(404).send("Page not found");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
