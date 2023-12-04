const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
// Random port, no reason
const PORT = 3250;

app.use(cors());
app.use(express.json());

// Endpoint for METAR data
app.get("/api/data/metar", async (req, res) => {
  try {
    const response = await axios.get("https://aviationweather.gov/api/data/metar", {
      mode: "cors",
      params: req.query,
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Endpoint for TAF data
app.get("/api/data/taf", async (req, res) => {
  try {
    const response = await axios.get("https://aviationweather.gov/api/data/taf", {
      params: req.query,
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Endpoint for Airport data
app.get("/api/data/airport", async (req, res) => {
    try {
      const response = await axios.get("https://aviationweather.gov/api/data/airport", {
        params: req.query,
      });
  
      res.json(response.data);
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).send("Internal Server Error");
    }
  });
  
  // This will be ran on a local port, since I do not own
  // a hosting service or have an exposed IP.
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });