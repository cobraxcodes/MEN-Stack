// 👤 Challenge 3: User Profiles by ID
// Description:
// Create a dynamic profile page for each user based on their id.

// Structure:
// Model: Array of users { id, name, age, email }
// Controller: Fetch a single user by id (from the URL param like /users/:id)
// View: Display the user’s name, age, and email on a profile.ejs page.
// Bonus: Add a "User not found" message if an invalid id is given.


const express = require('express')
const path = require('path')
const users = require('./controllers/userControllers.js')
const app = express()
const port = 3000

// templating enginer
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


// middleware
app.use(express.static('public')) // no static files 


//route
app.get('/userProfiles', users.userList)

// listena
app.listen(port, () =>{
    console.log (`Listening to port ${port}`)
})