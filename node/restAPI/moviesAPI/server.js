const express = require('express')
const app = express()
const movies = require('./controller/controller.js')
const port = 4001;


// templating engine



// middleware
app.use(express.json())


        // ROUTES

//getall route
app.get('/movies', movies.getAll)

// get movie by title
app.get('/movies/:title', movies.getTitle)

// create a movie
app.post('/movies', movies.createMovie)

// update movie
app.put('/movies/:title', movies.updateMovie)

// delete movie route
app.delete('/movies/:title', movies.delete)



// port
app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`)
}) 