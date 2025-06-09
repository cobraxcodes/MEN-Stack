const express = require ('express')
const path = require('path')
const userController = require('./controllers/userControllers.js') //importing userController from userController.js 
const app = express()
const port = 3000

// templating enginer
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// middleware
app.use(express.static('public'))

// route
app.get('/user', userController.userController)


// listen
app.listen(port, () =>{
    console.log(`Server is running at port ${port}`)
})