import { createClient } from 'redis'
import express from 'express'
const app = express()

const client = createClient() // this creates the redis connnection instance 
client.on('error' , (err) => console.log(`Redis connection problem ${err}`)) // listener if there are any issues with connecting to redis
await client.connect() // establishes connection 


// EXAMPLES: api/products(endpoint)
app.get('/api/endpoint', async (req,res) =>{ // ROUTE WILL BE IN SERVER.JS

    // THE REST OF LOGIC GOES INSIDE CONTROLLER 
    const cachedProducts = await client.get('products') // this checks cache if the 'products' are inside of it 
     if(cachedProducts){ // if so, then it sent back as a response
        console.log('Serving productt from cache')
        return res,json(JSON.parse(cachedProducts))
    }
    console.log('Serving products from database ') // if coming from the database. using moongoose product.find() to get all products from db
    const product = await product.find()

    await client.setEx('products', 30, JSON.stringify(product)) // and then stores products into cache for 30 seconds in a json format

    res.json(product) // and then of course sends back the products found from database

})

   
    