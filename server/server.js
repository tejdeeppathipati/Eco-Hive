const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
    .connect("mongodb://localhost:27017/ecosphere", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/events", require("./routes/events")); // Add event routes for RSVP

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
