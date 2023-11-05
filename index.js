// index.js
require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const socketIo = require('socket.io');
const { sequelize } = require('./database/data_models');
const routes = require('./routes');

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // Adjust to match the domain of your front end
    methods: ["GET", "POST"],
  },
});

const apiKey = process.env.GOOGLE_MAPS_API_KEY;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes);

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('sendMessage', (message) => {
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Test DB connection
sequelize.authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch((error) => console.error("Unable to connect to the database:", error));

app.get('/', (req, res) => {
  res.send('SkyConnect Backend is running.');
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// ...other server setup code...

// const axios = require('axios');

// app.get('/get-boarding-gate-location', async (req, res) => {
//   try {
//     // Make a request to the Google Maps API or another service.
//     // For example, using the Google Maps API to get location details:
//     const response = await axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
//       params: {
//         place_id: 'your_place_id', // replace with actual data
//         key: process.env.GOOGLE_MAPS_API_KEY // ensure your API key is stored safely
//       }
//     });

//     // Send back the relevant data to the front-end
//     res.json(response.data.result.geometry.location);
//   } catch (error) {
//     console.error("Error fetching from Google Maps API", error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// ...other server setup code...

