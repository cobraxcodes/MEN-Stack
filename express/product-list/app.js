// 📦 Challenge 1: Product List
// Description:
// Create a simple product listing page that displays a list of products with names and prices.

// Structure:
// Model: Array of products { id, name, price }
// Controller: Fetch the products and render a products.ejs view
// View: Loop through the products and display each name and price.


const express = require('express')
const path = require('path')
const products = require('./controller/productController.js')
const app = express()
const port = 3000

// templating engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


// middleware
app.use(express.static('public')) // No static files , adding it in for consistency


// route
app.get('/products', products.productController)

// listen
app.listen(port, () =>{
    console.log(`Server is listening at port ${port}`)
})