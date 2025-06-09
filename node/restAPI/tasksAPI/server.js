const express = require('express')
const app = express()
const tasks = require('./controllers/controller.js')
const post = 3000


// templating engine

//middleware
app.use(express.json())


// ROUTES
//getALL
app.get('/tasks', tasks.getAll)
//getByName
app.get('/tasks/:name', tasks.getName)
//createTask
app.post('/tasks/new', tasks.createTask)
//updateTask
app.patch('/tasks/:name', tasks.updateTask)
//deletTask
app.delete('/tasks/:name', tasks.deleteTask)

// post
app.listen(post, ()=>{
    console.log(`Server is listening on post ${post} from ${__dirname}`)
})