// * Imports
const express = require("express");
const dotenv = require("dotenv");
const goalRoutes = require("./routes/goalRoutes");
const userRoutes = require("./routes/userRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const colors = require("colors");
const cors = require("cors");

// * Initializations
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
dotenv.config();

// * Database connection
connectDB();

// * CONSTANTS
const PORT = process.env.PORT || 8080;

// * Endpoints
app.use("/api/goals", goalRoutes);
app.use("/api/users", userRoutes);

// * Error Handler
app.use(errorHandler);

// * Starting the server
app.listen(PORT, (req, res) => {
  console.log(`Server running on PORT ${PORT}`);
});
