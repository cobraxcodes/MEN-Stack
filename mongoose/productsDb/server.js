const express = require ('express')
const {connect} = require ('./database/database.js')
const morgan = require ('morgan')
const products = require('./controller/controller.js')

const app = express()
const port = 3004

// no templating engine

// middleware (express.json, morgan)
app.use(express.json())
app.use(morgan('method: :url| Status: :status| Time: :response-time ms| Date: :date[clf]'))


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

//routes
app.post('/products/new', products.create) // post method for creating a new product
app.get('/products', products.getAll) // get method for fetching all products
app.patch('/products/:id', products.update) // patch method for updating a product
app.delete('/products/:id', products.delete) // delete method for deleting a product
app.get('/products/:name', products.getByName)



// global handler
app.use((err,req,res,next) =>{
    console.log(`Something went wrong! Error: ${err.message} \n Stack Trace ${err.stack}`)
    res.status(404).send(`No Resource Found`)
})