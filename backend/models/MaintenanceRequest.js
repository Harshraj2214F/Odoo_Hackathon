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
      type: {
        type: String,
        enum: ["Corrective", "Preventive"],
        required: true,
      },
    },
    stage: {
      type: String,
      enum: ["New", "In Progress", "Repaired", "Scrap"],
      default: "New",
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
