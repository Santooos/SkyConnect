require('dotenv').config();
const express = require('express');
//const app = express();
const { Sequelize, DataTypes } = require("sequelize");
const PORT = process.env.PORT || 3000;
const routes = require('./routes');
const cors = require('cors');
const {sequelize,User} = require('./database/data_models');
const app = express();
app.use(cors());

app.use('/', routes);
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));

//Testing DB connection
async function TestConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
TestConnection();

app.get('/', (req, res) => {
  res.send('SkyConnect Backend is running.');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
