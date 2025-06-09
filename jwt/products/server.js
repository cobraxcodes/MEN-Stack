require ('dotenv').config()
const {connect} = require ('./database/database.js')
const {authenticate} = require ('./middleware/authenticate.js')
const express = require ('express')
const morgan = require ('morgan')
const products = require('./controller/controller.js')
const ratelimit = require ('express-rate-limit')
const cors = require ('cors')
const helmet = require ('helmet')
const app = express()
const port = 3004


// security header


// rate limiter
const limiter = ratelimit ({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: `Too many requests from IP, please try again later.`
})


// templating engine

// middleware (express.json, morgan)
app.use(limiter)
app.use(express.json())
app.use(morgan('method: :url| Status: :status| Time: :response-time ms| Date: :date[clf]'))
app.use(cors())
app.use(helmet())




//connect to server
const start = async() =>{
    try{
        await connect()
        app.listen(port, ()=>{
            console.log(`Server is listening on port ${port}`)
        })

    }catch(error){
        console.log(`Unable to connect to server! Error: ${error.message}`)
    }
}

start()


// login route
app.post('/login', products.loginUser) // login user route
// logout route
app.post('/logout', products.logoutUser) // logout user route
// signup route
app.post('/signup', products.signup)
// delete user route
app.delete('/user/:username', products.deleteUser)
//routes
app.post('/products/new', authenticate , products.create) // post method for creating a new product
app.get('/products', products.getAll) // get method for fetching all products
app.patch('/products/:id', products.update) // patch method for updating a product
app.delete('/products/:id', products.delete) // delete method for deleting a product
app.get('/products/:name', products.getByName)



// global handler
app.use((err,req,res,next) =>{
    console.log(`Something went wrong! Error: ${err.message} \n Stack Trace ${err.stack}`)
    res.status(404).send(`No Resource Found`)
})