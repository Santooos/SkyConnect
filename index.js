require('dotenv').config();
const express = require('express');
//const app = express();
const PORT = process.env.PORT || 3000;
const routes = require('./routes');
const cors = require('cors');
const app = express();
app.use(cors());

app.use('/', routes);
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));

app.get('/', (req, res) => {
  res.send('SkyConnect Backend is running.');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
