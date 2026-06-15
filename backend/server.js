const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors())

mongoose.connect("mongodb://localhost:27017/ticket")
    .then(() => console.log("MongoDB connection success"))
    .catch((err) => console.log(err));

const ticketRoutes = require("./routes/TicketRoutes");
app.use('/api/tickets', ticketRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));