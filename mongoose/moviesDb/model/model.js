// Schema: { title: String, director: String, year: Number, genre: String }

const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    title: {type: String, required: true},
    director: {type: String, required: true},
    year: {type: Number, required: true},
    genre: {type: String, required: true}
})

movieSchema.post('findOne', function (doc, next){
  if(!doc){
    console.log(`No movie found!`)
  }else{
    console.log(`Movie found : ${doc.name}`)
  }
  next()
})

const movies = mongoose.model('Movies', movieSchema)

module.exports = movies
