const {verifyToken} = require ('../utils/jwtUtils.js')
const user = require ('../controller/controller.js')



    const authenticate = (req,res, next) =>{
        const token = req.headers.authorization?.split(' ')[1] // splitting token from bearer 

       if(!token){ // if no token is provided, it doesn't need to enter try/catch and immediately returns error
        console.log(`No Token provided`)
        return res.status(401).json({
            message: `No Token provided!`
        })
    }
    try{
        const decoded = verifyToken(token); // if token is provided, pass the token in verify token function

        if(!decoded){ // if token is not verified, then return 401 status
        console.log(`Token not valid`)
       return res.status(401).json({
            message: `Unable to verify token!`
        })
    }

     req.user = decoded // if decoded, attach token to user to use for protected routes

    console.log(`token verified proceed to next`)
    next()

    }catch(err){
        if(err.name === 'TokenExpiredError'){
            return res.status(401).json({
                message: `Token has expired, please login again!`
            })
        }
        next(err)
    }
   

   
}

module.exports = {authenticate};