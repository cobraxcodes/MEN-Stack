const express = require ('express')
const app = express()
const port = 3001
const users = require('./controllers/userController.js')
// importing users
// const {getUsers, createUser, getUserId, updateUser, removeUser} = require('./models/usersModel.js')

// templating engine
app.set('view engine', 'ejs' )


// middleware
app.use(express.json()) // middleware to use for parsing response into JSON to client

            // ROUTES

// get all route
app.get('/users', users.getUsersController)


// getUser by id route
app.get('/users/:id', (req,res) =>{
    const user = users.getUserIdController(req.params.id) // stores object information in user variable if id is found
    if(!user){return res.status(404).send(`User ${req.params.id} not found`)} // sends this if not found
    res.status(200).json(user)//  // it will send a response to the api with res.status and the user added
})


// post route (create a user)
app.post('/users', (req,res) =>{
   const newUser = req.body  // extract the information from the request
   users.createUserController(newUser) // calls the createUserController function from the controller and passes the body information to it
   res.json({ // sends the status code and the object back to user with a success message
    status: 200,
    message: "User creation successful",
    user: {newUser}
   })
})


// put/patch route for updating user data with user id
app.put('/users/:id', (req,res) =>{
    const userUpdate = (req.params.id, req.body) // using parameter here for id and request body to access updated information from request
    if(!userUpdate){
        return res.status(400).send(`User ${req.params.id} not found`)
    }
    res.json({
        status: 200,
        message: `User ${req.body.name}'s information has been updated`,
        user: {userUpdate}

    })
})


// //delete route
app.delete('/users/:id', (req,res)=>{
    const removedUser = users.deleteUserController(req.params.id)
    if(!removedUser){
        res.status(404).send(`User not found`)
    }
    res.json({
        status: 200,
        message: `User id: ${req.params.id} has been deleted`
    })
})




// listen
app.listen(port, () =>{
    console.log(`Server is listening on port ${port}`)
})  