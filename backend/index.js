const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const express = require("express");
const taskRoutes = require('./routes/taskRoutes');

const app = express();


const PORT = process.env.PORT || 3000; 

const connectDB = require("./config/dbConn");
connectDB()

//Routes
app.use('/api', taskRoutes);

mongoose.connection.once('open', () => {
    console.log("Connect to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

module.exports = app;