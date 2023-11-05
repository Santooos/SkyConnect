require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const socketIo = require('socket.io');
const { sequelize, Message } = require('./database/data_models'); // Import the Message model
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

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes);

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('sendMessage', async (data) => {
    try {
      // Assuming data contains { senderId, receiverId, content }
      const newMessage = await Message.create({
        senderId: data.senderId,
        receiverId: data.receiverId,
        content: data.content,
        timestamp: new Date(),
        read: false
      });

      io.emit('message', newMessage); // Emit the message to all clients
    } catch (error) {
      console.error('Error saving message to the database:', error);
      // You could also emit an error message to the client if necessary
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Test DB connection
sequelize.sync().then(() => { // Use sync to make sure the tables are created
  console.log("Connection has been established successfully.");
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error("Unable to connect to the database:", error);
});

// Rest of your code for other routes...
