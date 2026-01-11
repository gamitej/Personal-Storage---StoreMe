const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const express = require("express");
const cookieParser = require("cookie-parser");
const AuthRouter = require("./routes/Auth.route");
const FileRouter = require("./routes/File.route");
const { syncDatabase } = require("./models/Connection");

dotenv.config();
const app = express();
const { FE_ENDPOINT, PORT = 5001 } = process.env;

// Middleware
app.use(
  cors({
    origin: FE_ENDPOINT,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (_req, res) => {
  res.status(200).json({
    message: "StoreMe API is running",
    version: "1.0.0",
  });
});

// Routes
app.use("/api/auth", AuthRouter);
app.use("/api/files", FileRouter);

// Global Error Handler
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something went wrong!",
    message: err.message,
  });
});

syncDatabase();

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
