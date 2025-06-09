// import the export module from model
const books= require('../models/books.js')

// creating a function here to export into app.js
exports.booksController = (req, res) =>{
      const bookList = books.booksModel();// using dot notation to access objects inside the books model and calling it bookList 
    res.render('index', {bookList});  // rendering the index.ejs and the booklist
}