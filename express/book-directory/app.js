// 📚 Challenge 2: Book Directory
// Description:
// Display a list of books with their titles and authors.

// Structure:
// Model: Array of books { id, title, author }
// Controller: Get the books and render a books.ejs view
// View: List out the books’ titles and authors in a styled list.

const express = require ('express')
const path = require('path')
const books = require('./controller/bookController.js')
const app = express()
const port = 3000

// templating engineer
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// middleware
app.use(express.static('public')) // although, no static file for now - so this line doesn't actually do anything :)

//route
app.get('/bookList', books.booksController)

//listen
app.listen(port, () =>{
    console.log(`Server is running at port ${port}`)
})
