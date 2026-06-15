const express = require("express");
const Ticket = require("../models/Ticket");
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const newTicket = new Ticket({
            id: req.body.id,
            title: req.body.title,
            status: req.body.status,
            effort: req.body.effort,
            owner: req.body.owner,
            dueDate: req.body.dueDate
        });
        const savedTicket = await newTicket.save();
        res.status(201).json(savedTicket);
    } catch (err) {
        res.status(500).json({
            message: "failed to save ticket",
            error: err.message
        });
    }
});

router.get("/", async (req, res) => {
    try {
        const tickets = await Ticket.find();
        res.json(tickets);
    } catch (err) {
        res.status(500).json({
            message: "failed to fetch tickets",
            error: err.message
        });
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const updatedTicket = await Ticket.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.json(updatedTicket);
    } catch (err) {
        res.status(500).json({
            message: "failed to update ticket",
            error: err.message
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await Ticket.findByIdAndDelete(req.params.id);
        res.json({ message: "ticket deleted successfully" });
    } catch (err) {
        res.status(400).json({
            message: "failed to delete ticket",
            error: err.message
        });
    }
});

module.exports = router;
