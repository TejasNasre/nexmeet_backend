const User = require("../models/user");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

// Function to register a new user
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Validate request body for required fields
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide username, email, and password" });
    }

    // Check if user already exists with the given email or username
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Create a new user with the provided details
    const user = await User.create({ username, email, password });

    // Respond with success message if user is registered successfully
    res.status(201).json({ success: "User registered" });
  } catch (error) {
    // Log and respond with error if there's an issue during registration
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Function to log in a user
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if JWT_SECRET is set in the environment variables
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not set.");
      return res.status(500).json({ error: "Internal server error." });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      // Delay response to mitigate timing attacks
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // Check if the provided password matches the user's password
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // Generate a JWT token for the user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Respond with success message and token if login is successful
    return res
      .status(200)
      .json({ success: "User successfully logged in!", token });
  } catch (err) {
    // Log and respond with error if there's an issue during login
    console.error(err);
    return res
      .status(400)
      .json({ error: "Something went wrong, please try again." });
  }
};

module.exports = { register, login };
