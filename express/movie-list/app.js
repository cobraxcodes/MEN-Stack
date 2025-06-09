// 🎬 Challenge 4: Movie List with Ratings
// Description:
// Render a list of movies with their titles, release year, and IMDB rating.

// Structure:
// Model: Array of movies { id, title, year }
// Controller: Send the movie list to movies.ejs
// View: Display the movies sorted by rating (bonus: highest first).

const express = require('express')
const path = require('path')
const movies = require('./controllers/moviesController.js')
const app = express()
const port = 3000

// templating engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//middleware
app.use(express.static('public')) // if there's static html

//route
app.get('/movieList', movies.moviesController)


//listen
app.listen(port, ()=>{
    console.log(`Server is running on port:${port}`)
})