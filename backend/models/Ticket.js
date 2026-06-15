const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    id: String,
    title: String,
    status: {
        type: String,
        default: "new"
    },
    effort: String,
    owner: String,
    createdDate: {
        type: Date,
        default: Date.now
    },
    dueDate: Date,
});

module.exports = mongoose.model("Ticket", ticketSchema);
