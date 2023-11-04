const { Sequelize, DataTypes } = require("sequelize");

//New Sequelize instance
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database/data.sqlite",
});

const User = sequelize.define("User", {
    //Model attributes
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    linkedinProfile: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    profilePicture: {
        type: DataTypes.STRING,
        allowNull: false
    },
    jobTitle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    company: {
        type: DataTypes.STRING,
        allowNull: false
    },
    industry: {
        type: DataTypes.STRING,
        allowNull: false
    },
    skills: {
        type: DataTypes.STRING,
        allowNull: false
    },
    about: {
        type: DataTypes.STRING,
        allowNull: false
    },
    admiralsClubNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    travelStatuses: {
        type: DataTypes.STRING,
        allowNull: false
    },
    visibility: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    




});

//Connection Collection/Table
const Connection = sequelize.define("Connection", {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId1: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userId2: { 
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    initiatedBy: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.STRING,
        allowNull: false
    },
});


// ### Message Collection/Table
// Stores messages exchanged between users.
const Message = sequelize.define("Message", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    senderId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    receiverId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    timestamp: {
        type: DataTypes.STRING,
        allowNull: false
    },
    read: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
});


// ### TravelStatus Collection/Table

// Stores information about the travel plans of users.

const TravelStatus = sequelize.define("TravelStatus", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    startDate: {
        type: DataTypes.STRING,
        allowNull: false
    },
    endDate: {
        type: DataTypes.STRING,
        allowNull: false
    },
    visibility: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
});


//Notification Collection/Table
// Stores information about notifications to be sent to users.

const Notification = sequelize.define("Notification", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false
    },

});

async () => {
    try {
      await sequelize.sync({ alter: true });
      console.log("Database synchronized");
    } catch (error) {
      console.error("Error synchronizing database:", error);
    }
  };
  
  module.exports = { sequelize, User, Message, Connection, TravelStatus, Notification };
  