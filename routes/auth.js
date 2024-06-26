// Import the express module to create a router
const express = require("express");
// Create a new router instance
const router = express.Router();
// Import the register and login functions from the auth controller
const { register, login } = require("../controllers/auth");

// Define a POST route for user registration that uses the register function
router.post("/register", register);

// Define a POST route for user login that uses the login function
router.post("/login", login);

// Export the router to be used in other parts of the application
module.exports = router;