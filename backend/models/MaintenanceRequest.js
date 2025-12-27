const mongoose = require("mongoose");

const MaintTeamSchema = new mongoose.Schema(
  {
    subject: { type: String, required: true },
    equipment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Equipment",
    },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MaintTeam",
    },
    type: {
      type: String,
      enum: ["corrective", "preventive", "predictive"],
      required: true,
    },
    stage: {
      type: String,
      enum: ["new", "in progress", "repaired", "scrap"],
      default: "new",
    },
    scheduledDate: Date,
    duration: Number,
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MaintenanceRequest", MaintTeamSchema);
