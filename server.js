// server.js
const express = require('express');
const mongoose = require('mongoose');
const Marker = require('./models/Marker');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/building-accessibility-database', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err.message);
});

// Add your API routes and other middleware here

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.post('/markers', async (req, res) => {
    try {
      console.log('Received marker data:', req.body);
      const { name, latlng, rating, ratingCounts, numberOfRaters, comments } = req.body;
      const marker = new Marker({ name, latlng, rating, ratingCounts, numberOfRaters, comments });
      await marker.save();
      res.status(201).json(marker);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });