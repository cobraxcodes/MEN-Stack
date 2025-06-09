// importing dependencies here
const express = require ('express')
const morgan = require('morgan')
const events = require('./controller/controller.js')

// importing connect function here to connect to database whenever there is a http request
const {connect} = require ('./database/database.js')

// creating app w/ port
const app = express()
const port = 3002

// no templating engine

// middleware
app.use(express.json())
app.use(morgan(':method :url| Status: :status | Time: :response-time ms| Date: :date[clf'))

// connect to the mongo server using async function
const start = async () =>{
    try{
        await connect() // waiting for the connect function in database.js to work
        app.listen(port, () =>{ // when connected it listens to port 3002 for any requests
            console.log(`MongoDB server is listening on port ${port} from ${__dirname}`)
        })
    }catch(error){
        console.log(`Failed to connect to Database`)
    }
}

start() 

        // routes
// POST method - create an event
app.post('/events/new', events.create)
//GET method - read events
app.get('/events', events.all)
//PATCH method - update events
app.patch('/events/:name', events.update)
//DELETE method - delete an event
app.delete('/events/:id', events.delete)
// GET method - find an event by name
app.get('/events/:name' , events.getByName)




// global error handler
app.use((err,req,res,next) =>{
    console.error(`Stack trace: ${err.stack}`)
    res.status(500).send(`Something went wrong, please try again later!`)
})
