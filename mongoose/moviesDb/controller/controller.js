// CRUD: Full CRUD by movie title or ID
const movies = require('../model/model.js')

// CREATE LOGIC - create a movie entry
exports.create = async (req,res,next) =>{
    try{
        const moviesArray = await movies.find()
        const createMovie = new movies (req.body)
        const saveMovie = await createMovie.save()
        moviesArray.push(saveMovie)
        res.json({
            status: 200,
            message: `${saveMovie.title}`,
            newMovie: saveMovie
        })

    }catch(err){
        next(err)
    }
}

// READ LOGIC  - reads all movies
exports.getAll = async (req,res,next) =>{
    try{
        const allMovies = await movies.find()
        res.json({
            status: 200,
            movies: allMovies
        })
    }catch(err){
        next(err)
    }
}

// UPDATE LOGIC - updates a movie
exports.update = async (req,res,next) =>{
    try{
        const movie = await movies.findById(req.params.id)
        console.log(movie)
        if(!movie){return res.status(404).send(`Movie Not Found!`)}
        const updateMovie = await movies.findByIdAndUpdate(req.params.id, {
            title: req.body.title ?? movie.title,
            director: req.body.director ?? movie.director,
            year: req.body.year ?? movie.year,
            genre: req.body.genre ?? movie.genre
        },{new: true, runValidators: true})
        res.json({
            status: 200,
            message: `${updateMovie.title} has been updated!`,
            movie: updateMovie
        })
    }catch(err){
        next(err)
    }
}

//DELETE LOGIC -- delete an movie
exports.delete = async (req,res,next) =>{
    try{
           const deletedMovie = await movies.findByIdAndDelete(req.params.id)
           if(!deletedMovie){return res.status(404).send(`Movie Not Found`)}
           res.json({
            status: 200,
            message: `${deletedMovie.title} has been deleted`,
            deleted: deletedMovie
           })
    }catch(err){
        next(err)
    }
}