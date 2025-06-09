const movies = require('../models/moviesModel.js')

exports.moviesController = (req,res) =>{
    // calling the moviesModel here to get the movies object and store inside the movieList
    const movieList = movies.moviesModel();
    res.render('index', {movieList})

}