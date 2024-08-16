const express = require('express');
const cors = require('cors');
const axios = require('axios'); // Use Axios for HTTP requests

const app = express();
const port = 3001; // Port for the server

// Apply CORS middleware
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Route to fetch organisation units
app.post('/organisationUnits', async (req, res) => {
  const { location } = req.body; // Extract location from request body

  if (!location) {
    return res.status(400).send('Location in the request body is required');
  }

  try {
    const response = await axios.get(`https://ovckla.org/ovc/api/organisationUnits.json?filter=displayName:ilike:${location}`, {
      headers: {
        'Authorization': 'Basic ' + Buffer.from('Skununka:Nomisr123$$$$').toString('base64'),
        'Content-Type': 'application/json'
      }
    });

    res.json(response.data); // Send the data to the client
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
});

// Route to fetch tracked entity instances
app.post('/trackedEntityInstances', async (req, res) => {
  const { orgUnitId } = req.body; // Extract orgUnitId from request body

  if (!orgUnitId) {
    return res.status(400).send('orgUnitId in the request body is required');
  }

  try {
    const response = await axios.get(`https://ovckla.org/ovc/api/trackedEntityInstances/query.json?ou=${orgUnitId}&ouMode=SELECTED&&order=created:desc&program=IXxHJADVCkb&pageSize=50&page=1&totalPages=false&fields=*`, {
      headers: {
        'Authorization': 'Basic ' + Buffer.from('Skununka:Nomisr123$$$$').toString('base64'),
        'Content-Type': 'application/json'
      }
    });

    res.json(response.data); // Send the data to the client
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
