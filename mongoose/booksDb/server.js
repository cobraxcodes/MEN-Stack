const express = require('express')
const app = express()
const books = require('./controller/controller.js')
const port = 3001
const {connect} = require('./database/database.js')
const morgan = require('morgan')

// no templating engine

//middleware
app.use(express.json())
app.use(morgan(':method :url| Status: :status | Time: :response-time ms | Date: :date[clf]'))
debugger;

// connecting to the in-memory server
const startServer = async () => {
  try {
    await connect()
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`)
    })
  } catch (err) {
    console.error('Failed to connect to DB:', err)
  }
}

startServer()


        // ROUTES
//getAll route - get
app.get('/books', books.getAll)

// create a book - post
app.post('/books/new', books.create)

// update a book - patch
app.patch('/books/:id', books.update)

// delete a book - delete
app.delete('/books/:id', books.delete)

// get a book by name - get
app.get('/books/:title', books.getByName)



// global error handler here after routes
app.use((err, req, res, next) =>{ // global error handler
    console.error(`Stack trace: ${err.stack}`)
    res.status(404).send(`Resource Not Found`)
});
