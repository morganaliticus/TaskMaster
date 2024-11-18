const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const express = require("express");
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());


const PORT = process.env.PORT || 3000; 

const connectDB = require("./config/dbConn");
connectDB()

//Routes
app.use('/api', taskRoutes);
app.use('/api', userRoutes);

mongoose.connection.once('open', () => {
    console.log("Connect to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

module.exports = app;