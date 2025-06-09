const tasks = require('../models/model.js')

// GET ALL LOGIC
exports.getAll = (req,res) =>{
   res.json(tasks.taskModel())
}

//GET BY NAME
exports.getName = (req,res) =>{
    const task = tasks.taskModel().find(x => x.name.toLowerCase() === req.params.name.toLowerCase())
    if(!task){return res.status(404).send(`Sorry, cannot find the task you are looking for!`)}
    res.json({
        status: 200,
        name: task
    })
}

// CREATE A NEW TASK
exports.createTask = (req,res)=>{
    const taskBody = req.body
    const taskArray = tasks.taskModel()
    taskArray.push(taskBody)
    res.json({
        status:200,
        message: `Task successfully added!`,
        tasks: taskBody
    })
}

// UPDATE BOOLEAN VALUE (TASK PROGRESS)
exports.updateTask = (req,res) =>{
    const updateTask = tasks.taskModel().find(x => x.name.toLowerCase() === req.params.name.toLowerCase())
    if(!updateTask){return res.status(404).send(`Task Not Found!`)}
    updateTask.done = req.body.done 
    res.json({
        status:200,
        message: `Task '${req.params.name}' has been updated`,
        task: updateTask
})
}

//DELETE A TASK
exports.deleteTask = (req,res) =>{
    const index = tasks.taskModel().findIndex(x => x.name.toLowerCase() === req.params.name.toLowerCase())
    const taskArray = tasks.taskModel()
    if(index < 0){return res.status(404).send("Task Not Found!")}
    taskArray.slice(index,1)
    res.json({
        status:200,
        message: `Task '${req.params.name}' has been deleted`
    })
}
