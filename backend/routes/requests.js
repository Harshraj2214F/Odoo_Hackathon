const express = require("express");
const Request = require("../models/MaintenanceRequest");
const Equipment = require("../models/Equipment");
const router = express.Router();

// Auto Fill When team is selected
router.get("/equipment/:id/team", async (req, res) => {
  try {
    const equip = await Equipment.findById(req.params.id).populate("maintTeam");
    res.json({ team: equip.maintTeam });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create request
router.post("/", async (req, res) => {
  try {
    const request = new Request(req.body);
    await request.save();
    const populated = await Request.findById(request._id).populate(
      "equipment team"
    );
    res.json(populated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Drag-drop stage update
router.patch("/:id/stage", async (req, res) => {
  try {
    const request = await Request.findByIdAndUpdate(
      req.params.id,
      { stage: req.body.stage },
      { new: true }
    ).populate("equipment team assignedTo");

    if (req.body.stage === "Scrap") {
      request.notes = request.notes || [];

      request.notes.push("Equipment i marked as Scrap - no longer usable.");
      await request.save();
    }

    res.json(request);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
