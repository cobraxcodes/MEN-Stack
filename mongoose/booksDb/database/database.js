require('dotenv').config()
const mongoose = require('mongoose')
// replace <db_password> with your actual password or use an env variable
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://cobraxcodes:<db_password>@testcluster.gylfdcd.mongodb.net/booksDb?retryWrites=true&w=majority&appName=testCluster'

const connect = async () => {
  try {
    await mongoose.connect(mongoURI)
    console.log(`✅ Connected to MongoDB Atlas at ${mongoURI}`)
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error)
    process.exit(1)
  }
}

const close = async () => {
  await mongoose.disconnect()
}

module.exports = { connect, close }
