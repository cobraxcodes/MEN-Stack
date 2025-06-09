const jwt = require ('jsonwebtoken') // importing jwt package here


const secretKey = 'example'

// token creation function
const createToken = payload =>{
    return jwt.sign(payload, secretKey) // can use options for token expiration and issuer
}

// token verification
const verifyToken = (token, next) =>{
    try{
        return jwt.verify(token, secretKey)
    }catch(err){
        next(err)
    }
}

module.exports = {createToken, verifyToken}