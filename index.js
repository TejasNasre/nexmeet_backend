const express = require("express");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const dotenv = require("dotenv").config();
const { connect } = require("./db/connect");
const auth = require("./routes/auth");

if (!process.env.PORT || !process.env.DB_URL) {
  console.error("Critical environment variables are missing.");
  process.exit(1); // Exit the application if critical variables are missing
}

const app = express();
const PORT = process.env.PORT || 3000;

// Database Connection
connect(process.env.DB_URL)
  .then(() => console.log("Database Successfully Connected!"))
  .catch((err) => console.error(err));

// Middlewares
app.use(helmet()); // Set security-related HTTP response headers
app.use(cors()); // Configure CORS appropriately based on your requirements
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use("/auth", auth);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Server Listen
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
