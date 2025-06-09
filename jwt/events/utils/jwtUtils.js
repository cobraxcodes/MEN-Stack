require ('dotenv') .config()
const jwt = require('jsonwebtoken')

const secretKey = process.env.JWT_SECRET

const generateToken = payload =>{
    return jwt.sign(payload, secretKey)
}


const verifyToken = (token, next) =>{
 try{
        return jwt.verify(token, secretKey)
    }catch(err){
        next(err)
    }
}
   

module.exports = {generateToken, verifyToken}
