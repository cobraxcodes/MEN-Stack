const {createClient} = require ('redis')
const client = createClient()

   client.on('error', (err) => console.log(`Unable to connect to ${err}`))

const startRedis = async () =>{
    try{
        await client.connect()
        console.log('Successfully connected to redis')
    }catch(error){
      console.log(`Something went wrong with redis: ${error}`)
    }
}
startRedis()

module.exports = client