// Schema: { title: String, author: String, pages: Number, published: Date }

const mongoose = require ('mongoose')

const bookSchema = new mongoose.Schema({
        title: { type: String , required: true },
        author: { type: String, required: true },
        pages: { type: Number, required: true },
        published: { type: Date }

})

const books = mongoose.model('Book', bookSchema)

module.exports = books