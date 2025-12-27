const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const router = require("./routes/requests");

const MaintenanceRequest = require("./models/MaintenanceRequest");
//const Equipment = require("./models/Equipment");
const MaintTeam = require("./models/MaintTeam");

const MONGODB_URI = process.env.MONGODB_URI;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(MONGODB_URI, {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api/requests", require("./routes/requests"));

// Test endpoint

app.get("/api/requests", async (req, res) => {
  const requests = await MaintenanceRequest.find().populate("equipment team");
  res.json(requests);
});

app.get("/api/test", (req, res) => {
  res.send("Odoo Hackathon Backend is running");
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
