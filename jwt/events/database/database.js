require ('dotenv').config() // require dotenv first
const mongoose = require('mongoose') // adding in mongoose dependency
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://cobraxcodes:<db_password>@testcluster.gylfdcd.mongodb.net/?retryWrites=true&w=majority&appName=testCluster'

const connect = async () =>{
    try{
        await mongoose.connect(mongoURI)
        console.log(`Successfully connected to MongoDB Atlas`)
    }catch(error){
        console.log(`There was a problem connecting to the MongoDb Atlas database: ${error}`)
        process.exit(1)
    }
}

const close = async () =>{
    await mongoose.disconnect()
}
module.exports = {connect , close} 