const Task = require('../models/task');

/*
 create the task
 r-getAllTasks
 u-updatetask
 d-deleteTask
*/

const createTask = async (req, res) => {
    const data = req.body;
    console.log(data);

    //validate priority field
    if(!["low", "medium", "high"].includes(data.priority)) {
        return res.status(400).json({
            error: "'priority' must be one of 'low', 'medium', or 'high'."
        });
    }

    const newTask = new Task(data);
    await newTask.save();

    res.status(201).json(newTask);
}

module.exports = {createTask};