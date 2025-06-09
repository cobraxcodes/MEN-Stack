const movies = require('../models/model.js')


// GET ALL ROUTE
exports.getAll=(req,res)=>{ 
   res.json(movies.moviesModel()) // always have a res.json to send back data ! sending back the movies 
} 

// GET MOVIE BY TITLE
exports.getTitle = (req,res) =>{
    const movieTitle = movies.moviesModel().find(x => x.title.toLowerCase() === req.params.title)
    if(!movieTitle){return res.status(404).send(`No Movie Found!`)}
    res.json({
        status: 200,
        movie: movieTitle
    })
}

// CREATE MOVIE
exports.createMovie = (req,res) =>{
    const newMovie = req.body
    const movieHolder = movies.moviesModel()
    movieHolder.push(newMovie)
    res.json({
        status: 200,
        message: "Movie Added!",
        movie: newMovie
    })
}

//UPDATE MOVIE
exports.updateMovie = (req,res) =>{
    const foundMovie = movies.moviesModel().find(x => x.title.toLowerCase() === req.params.title.toLowerCase())
    if(!foundMovie){return res.status(404).send(`No Movie Found!`)}
    foundMovie.title = req.body.title || foundMovie.title
    foundMovie.year = req.body.year || foundMovie.year
    res.json({
        status: 200,
        message: `Movie ${foundMovie} has been updated!`,
        movie: foundMovie
    })
}

//DELETE MOVIE LOGIC
exports.delete = (req,res) =>{
    const index = movies.moviesModel().findIndex(x => x.title.toLowerCase() === req.params.title.toLowerCase())
    if(index < 0 ){return res.status(404).send("No movie found!")}
    movies.moviesModel().slice(index, 1)
    res.json({
        status: 200,
        message: `Movie ${req.params.title} deleted` ,
    })
}