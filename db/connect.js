// Import the mongoose module to interact with MongoDB
const mongoose = require("mongoose");

// Define an asynchronous function to establish a connection to MongoDB
const connect = async (url) => {
  try {
    // Attempt to connect to MongoDB using the provided URL
    await mongoose.connect(url);
  } catch (error) {
    // Log any errors that occur during the connection attempt
    console.log(error);
  }
};

// Export the connect function for use in other parts of the application
module.exports = { connect };