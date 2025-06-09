const {loginUser} = require ('./controller/controller.js')
const {authenticate} = require ('./authMiddlewares/authMiddleware.js')
const express = require ('express')
const app = express()

// Login route — checks user credentials, and if valid, generates and sends a JWT
app.post('/login', loginUser)

// Protected route — only accessible if user has a valid JWT token
app.get('/protected', authenticate, (req, res) => { // adding authenticate function in route
  res.json({ message: `Welcome ${req.user.username}, you're authorized!` });
});