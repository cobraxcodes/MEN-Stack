const express = require('express')
const morgan = require ('morgan')
const reviews = require ('./controller/controller.js')
const {connect} = require('./database/database.js')
const logger = require ('./logger.js')

const app = express ()
const port = 3005

// no templating engine

// middleware (morgan, express.json)
app.use(express.json())
app.use(morgan(':method :url|Status: :status|Time: :response-time ms| Date: :date[clf]'))

// connect to server
const start = async () =>{
    try{
        await connect()
         app.listen(port, () =>{
        logger.info(`Server is listening on port ${port}`)
    })
    }catch(error){
        logger.error(`Unable to connect to server. Error: ${error.message} \n Stack Trace: ${error.stack}`)
    }
}

start()

//routes
app.post('/reviews/new', reviews.create) // post method to create a review
app.get('/reviews', reviews.getAll) // get method to get all reviews
app.patch('/reviews/:id', reviews.update) // patch method to update a review
app.delete('/reviews/:id', reviews.delete) // delete method to delete a review
app.get('/reviews/:name', reviews.getByName) // get method to get a review by name


//global handler 
app.use((err,req,res,next) =>{
    console.log(`Something went wrong! \n StackTrace: ${err.stack}`)
    res.status(404).send(`Resource Not Found!`)
})

// final