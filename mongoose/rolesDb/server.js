const express = require ('express')
const {connect} = require ('./database/database.js')
const morgan = require ('morgan')
const logger = require ('./logger.js')
const roles = require ('./controller/controller.js')

const app = express()
const port = 3006


// no templating engine

//middleware (morgan, express.json)
app.use(express.json())
app.use(morgan(':method :url|Status: :status|Time: :response-time ms|Date: :date[clf]'))

// connect to server
const start = async() =>{
    try{
    await connect()
    app.listen(port, ()=>{
        logger.info(`Server is listening on port ${port}`)
    })
    }catch(error){
       logger.error(`Unable to connect to server! ${error.message} \n Stack Trace: ${error.stack}`)
    }
}

start()
// routes
app.post('/roles/new', roles.create) // post method for creating a new role
app.get('/roles', roles.getAll) // get method for getting all roles
app.patch('/roles/:id', roles.update) //patch method for updating all roles
app.delete('/roles/:id', roles.delete) // delete method for deleting a role
app.get('/roles/:name', roles.getByName) // get method for find a role by a name

//global error handler
app.use((err,req,res,next) =>{
    console.log(`Something went wrong! Error: ${err.message} \n Stack Trace: ${err.stack}`)
    res.status(404).send("Resource Not Found")
})