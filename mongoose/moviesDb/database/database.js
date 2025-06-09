require ('dotenv') .config()
const mongoose = require('mongoose')
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://cobraxcodes:<db_password>@testcluster.gylfdcd.mongodb.net/booksDb?retryWrites=true&w=majority&appName=testCluster'

const connect = async () =>{
    try{
        await mongoose.connect(mongoURI)
        console.log(`Connected to Mongodb Atlas`)

    }catch(error){
        console.log(`Unable to connect to Mongodb Atlas! \nError: ${error}`)
    }
}

const close = async() =>{
    await mongoose.disconnect()
}

module.exports = {connect, close}