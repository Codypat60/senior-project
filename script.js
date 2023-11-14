const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3025;

app.use(cors());
app.use(express.json());

// Endpoint for METAR data
app.get('/api/data/metar', async (req, res) => {
  try {
    const response = await axios.get('https://aviationweather.gov/api/data/metar', {
      params: req.query,
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint for TAF data
app.get('/api/data/taf', async (req, res) => {
  try {
    const response = await axios.get('https://aviationweather.gov/api/data/taf', {
      params: req.query,
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Internal Server Error');
  }
});


app.get('/api/data/airport', async (req, res) => {
    try {
      const response = await axios.get('https://aviationweather.gov/api/data/airport', {
        params: req.query,
      });
  
      res.json(response.data);
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).send('Internal Server Error');
    }
  });
  
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
  
  