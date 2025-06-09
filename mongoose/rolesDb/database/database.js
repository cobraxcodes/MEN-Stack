require ('dotenv') .config()
const mongoose = require ('mongoose')
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://cobraxcodes:<db_password>@testcluster.gylfdcd.mongodb.net/booksDb?retryWrites=true&w=majority&appName=testCluster'

const connect = async() =>{
    try{
        await mongoose.connect(mongoURI)
        console.log(`Succesfully connected to ${mongoose.connection.name} database`)
    }catch(error){
        console.log(`Database connection failed, Error: ${error.message} \nStack trace: ${error.stack}`)
    }
}

const disconnect = async() =>{
    await mongoose.disconnect()
}

module.exports = {connect, disconnect}