const {createClient} = require ('redis')
const client = createClient()

// connect to redis
const startRedis = async() =>{
try{
    await client.connect()
    console.log('Successfully connected to redis')
}catch(error){
    client.on('error', err => console.log(`Unable to connect to redis, ${err}`))
}
}
startRedis()

module.exports = client
