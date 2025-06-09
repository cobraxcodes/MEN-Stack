require ('dotenv').config()
const mongoose = require('mongoose')
const mongoURI = process.env.MONGO_URI ||'mongodb+srv://cobraxcodes:<db_password>@testcluster.gylfdcd.mongodb.net/booksDb?retryWrites=true&w=majority&appName=testCluster'

const connect = async () => {
    try{
        await mongoose.connect(mongoURI)
        console.log(`Successfully connected to MongoDb Atlas`)
    }catch(error){
        console.log(`Unable to connect to MongoDb Atlas , Error: ${error}`)
    }
}

const disconnect = async() =>{
    await mongoose.disconnect()
}

module.exports = {connect, disconnect}