const express = require("express");
const router = express.Router();
const Event = require("../models/Event"); // Replace with your Event model

// RSVP Route
router.post("/:id/rsvp", async (req, res) => {
    const { id } = req.params;

    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        if (event.status === "Sold-Out") {
            return res.status(400).json({ message: "Event is sold out" });
        }

        // Update RSVP count
        event.rsvpCount += 1;
        await event.save();

        res.json({ message: `RSVP successful for ${event.name}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
