// Import the jsonwebtoken package for handling JWTs
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

// Define middleware to authenticate requests using JWT
const authMiddleware = (req, res, next) => {
  // Extract the token from the Authorization header and remove the "Bearer " prefix
  const token = req.header("Authorization").replace("Bearer ", "");
  // If no token is provided, return a 401 Unauthorized response
  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });

  try {
    // Verify the token using the secret key and decode it
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach the decoded token (user information) to the request object
    req.user = decoded;
    // Call the next middleware function in the stack
    next();
  } catch (error) {
    // If token verification fails, return a 401 Unauthorized response
    res.status(401).json({ message: "Token is not valid" });
  }
};

// Export the authMiddleware function to be used in other parts of the application
module.exports = { authMiddleware };
