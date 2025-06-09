const {createClient} = require ('redis')
const client = createClient()

const startRedis = async (next) =>{
    try{
        await client.connect()
        console.log('Successfully connected to redis')
        client.on('error', (err) => console.log(`Unable to connect to Redis ${err}`))
    }catch(err){
        next(err)
    }
}

startRedis()
module.exports = client