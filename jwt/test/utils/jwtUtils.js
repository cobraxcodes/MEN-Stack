const jwt = require ('jsonwebtoken')

const secretKey = 'example'

// token creation
const generateToken = payload =>{
    return jwt.sign(payload, secretKey, options) // this is the token itself
}

// token verification 
const verifyToken = (token, next) =>{
    try{
        return jwt.verify(token, secretKey) // verifies token when user is trying to access a protected route
    }catch(err){
        next(err)
    }
}

module.exports = {generateToken, verifyToken}