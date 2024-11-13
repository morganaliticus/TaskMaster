const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String},
    dueDate: {type: Date},
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        required: true
    }, 
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
}, {timestamps: true});

module.exports = mongoose.model("Task", taskSchema);