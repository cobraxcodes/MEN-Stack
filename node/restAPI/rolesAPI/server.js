const express = require ('express')
const app = express()
const roles = require('./controllers/controllers.js')
const port = 3000;

        // TEMPLATING ENGINE


        // MIDDLEWARE
app.use(express.json())

        // ROUTES
//getAll route
app.get('/roles', roles.getAll)

//get user by id route
app.get('/roles/:id', roles.getById)

// create a route
app.post('/roles/new', roles.createRole)

// updating route
app.patch('/roles/:id', roles.updateRole)

// delete route
app.delete('/roles/:id' , roles.deleteUser)
        
        // PORT
app.listen(port, () =>{
    console.log(`Server is listening at port ${port} ${__dirname}`)
})