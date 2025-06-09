const {connect} = require('./database/database.js')
const express = require('express')
const morgan = require ('morgan')
const movies = require('./controller/controller.js')

const app = express()
const port = 3002

// no templating engine

// middleware
    app.use(express.json())
    app.use(morgan(':method :url| Status: :status | Time: :response-time ms| Date: :date[clf]'))


    // CONNECT TO SERVER
    const start = async() =>{
        try{
            await connect()
            app.listen(port, ()=>{
                console.log(`Server is listening to port ${port}`)
            })
        }catch(error){
            console.error(`Unable to connect to the server Error: ${error.message}`)
        }
    }
start()
    // ROUTES
// CREATE A MOVIE = post route
app.post('/movies/new', movies.create)
// GET ALL MOVIES = get route
app.get('/movies', movies.getAll)
// UPDATE A MOVIE = patch route
app.patch('/movies/:id', movies.update)
// DELETE A MOVIE = delete route
app.delete('/movies/:id', movies.delete)



    //GLOBAL ERROR HANDLER
app.use((err,req,res,next) =>{
    console.error(`Something went wrong \n Stack Trace: ${err.stack}` )
    res.status(404).send(`Resource Not Found`)
})