require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const socketIo = require('socket.io');
const bcrypt = require('bcryptjs');
const { sequelize, User, Message } = require('./database/data_models'); // Import the User and Message models
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

// User signup route
app.post('/api/signup', async (req, res) => {
  const { firstName, lastName, email, password, linkedinProfile, jobTitle, company, industry, skills, about, admiralsClubNumber, travelStatuses, visibility } = req.body;
  try {
    // Check if user already exists
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(409).json({ message: 'User already exists with this email' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      passwordHash: hashedPassword,
      linkedinProfile,
      jobTitle,
      company,
      industry,
      skills,
      about,
      admiralsClubNumber,
      travelStatuses,
      visibility
    });

    // Respond with the created user (excluding sensitive information)
    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        // Include other fields as appropriate
      }
    });
  } catch (error) {
    console.error('Error during user signup:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// User login route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    // Add session or token generation here
    res.json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Socket.io connection and message event
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('sendMessage', async (data) => {
    try {
      // Validate data before attempting to create the message
      if (!data.senderId || !data.receiverId || !data.content) {
        // Emit an error event to the client
        socket.emit('error', 'senderId, receiverId, and content are required.');
        return;
      }

      // Create the message
      const newMessage = await Message.create({
        senderId: data.senderId,
        receiverId: data.receiverId,
        content: data.content,
        timestamp: new Date().toISOString(), // Store the timestamp as an ISO string
        read: false
      });

      // Emit the new message to all clients
      io.emit('message', newMessage.get({ plain: true })); // Send only the data values
    } catch (error) {
      console.error('Error saving message to the database:', error);
      // Optionally, emit an error message back to the client
      socket.emit('error', 'An error occurred while saving the message.');
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Sync sequelize models and start the server
sequelize.sync({ force: true }) // force true will drop tables each time. Use { alter: true } or remove for production
  .then(() => {
    console.log("Database synced successfully.");
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }).catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

// ...rest of the server setup...
