const mongoose = require("mongoose");

const MaintTeamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  members: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  ],
});

module.exports = mongoose.model("MaintTeam", MaintTeamSchema);
