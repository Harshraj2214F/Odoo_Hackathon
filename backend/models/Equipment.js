const mongoose = require("mongoose");

const EquipmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    serial: { type: String, unique: true, required: true },
    purchaseDate: { type: Date, default: Date.now },
    warrantyUntil: { type: Date },
    department: { type: String, required: true },
    location: { type: String, required: true },
    maintTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MaintTeam",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Equipment", EquipmentSchema);