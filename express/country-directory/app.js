// 🌎 Challenge 5: Country Directory
// Description:
// Display a list of countries with their name and capital city.

// Structure:
// Model: Array of countries { id, name, capital }
// Controller: Get the countries and render a countries.ejs view
// View: Show each country’s name and capital in a table.

const express = require('express')
const path = require('path')
const countries = require('./controllers/countriesController.js')
const app = express()
const port = 3000

// templating engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// middleware
app.use(express.static('public')) // no static files tho :)

// country list route
app.get('/countryList', countries.countryListController)

// listen
app.listen(port, () =>{
    console.log(`Server is running at port ${port}`)
})