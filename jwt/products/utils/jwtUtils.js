const jwt = require ('jsonwebtoken')
const secretKey = process.env.JWT_SECRET;
const options = {
    expiresIn: '1d'
}

// //{  other factors that can be used for options personalization
//   expiresIn: '1h',
//   issuer: 'myAppName',
//   subject: 'userLogin'
// }

const createToken = payload =>{
    return jwt.sign(payload, secretKey, options)
}

const verifyToken = (token) =>{
        return jwt.verify(token, secretKey)
        
}

module.exports = {createToken, verifyToken}