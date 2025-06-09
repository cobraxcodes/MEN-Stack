const bcrypt = require ('bcrypt')
const {products, users} = require('../model/model.js')
const {createToken} = require ('../utils/jwtUtils.js')
const {verifyToken} = require('../utils/jwtUtils.js')
const client = require ('../utils/redis.js')



// LOGIN LOGIC
exports.loginUser = async (req, res, next) =>{
    try{
        const {username, password} = req.body // desctructuring username and password from the request's body
        const user = await users.findOne({username}) // finding user by username
        if(!user){ // if not user is found , then send message
            return res.status(404).json({
                message: `Username Not Found`
            })
        }
        const passwordMatch = await bcrypt.compare(password, user.password) // if user is found, it then hashes the password and matches it using bcrypt compare to the hashed password in database
        if(!passwordMatch){
            return res.status(401).json({message: "Password is invalid!"})
        }
        const token = createToken ({username: user.username}) // if password is valid, token is then given to user specifically tied to their username
        res.status(200).json({message: "Login successful!", token})
    }catch(err){ // for unknown errors
        next(err)
    }
}

// LOGOUT LOGIC
exports.logoutUser = (req, res, next) => {
    
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    return res.status(401).send(`No token provided!`)
  }
    const loggedOutTokens = []
    console.log(loggedOutTokens)
  try {
    const verifiedToken = verifyToken(token) // skip verification of token next time and just push token to blacklist
    if (verifiedToken) {
      loggedOutTokens.push(token)
      return res.send({
        message: `Log out successful!`
      })
    }
  } catch (err) {
    // Token is invalid or expired, still push it to blacklist (or skip — up to you)
    if (err.name === 'TokenExpiredError') {
      loggedOutTokens.push(token)
      return res.status(401).json({
        message: `Token already expired — logged out anyway!`
      })
    }
    return res.status(401).json({ message: 'Invalid token, cannot logout' })
  }
}


// SIGN UP LOGIC
exports.signup = async (req,res,next) =>{
    try{
        const {username, password} = req.body
        if(!username || username.length < 6){
            return res.status(401).json({
                message: `username ${username} is invalid. Usernames must be atleast 6 characters long!`
            })
        }
        if(!password || password.length < 8){
            return res.status(401).json({
                message: `password invalid. password must atleast be 8 characters long!`
            })
        }
        const existingUser = await users.findOne({username})
        if(existingUser){
            return res.status(400).json({
                message: `Username ${existingUser} already taken!`
            })
        }
        const newUser = new users ({username, password})
        const saveUser = await newUser.save()
          console.log(saveUser)
        const token = createToken({username})
        res.status(201).json({
            message: `User ${saveUser.username} successfully created!`, token
        })
    }catch(err){
        next(err)
    }
    }

    // DELETE USER 
    exports.deleteUser = async (req,res,next) =>{
        try{
            const findUser = await users.findOneAndDelete({
                username: new RegExp(`^${req.params.username}$`, "i")
            })
            if(!findUser){
                return res.status(404).json({
                    message: `User ${req.params.username} not found!`
                })
            }
            res.status(200).json({
                message: `User ${findUser.username} succesfully deleted!`
            })

        }catch(err){
            next(err)
        }
    }






// CREATE LOGIC
exports.create = async (req,res,next) =>{
    try{
        const newProduct = new products(req.body)
        const saveProduct = await newProduct.save()
        res.json({
            status: 200,
            message: `Product created!`,
            product: newProduct
        })
    }catch(err){
        console.log("Cannot create product")
        next(err)
    }
}

// READ LOGIC
exports.getAll = async (req,res,next) =>{
    try{
    const cachedProducts = await client.get('products')
    if(cachedProducts){
        console.log(`Showing products from cache`)
         return res.json(JSON.parse(cachedProducts))
    }
    console.log(`Showing products from database`)
    const allProducts = await products.find()
    await client.setEx('products', 30, JSON.stringify(allProducts))
    res.status(200).json({
        products: allProducts
    })
    }catch(err){
        next(err)
    } 
}


// UPDATE LOGIC
exports.update = async (req,res,next) =>{
    try{
        const product = await products.findById(req.params.id)
        if(!product){return res.status(404).send('Product Not Found!')}
        const updatedProduct = await products.findByIdAndUpdate(req.params.id, {
            name: req.body.name ?? product.name,
            stock: req.body.stock ?? product.stock
        })
        res.json({
            status: 200,
            message: `${updatedProduct.name},  has been updated!`,
            update: product
        })

    }catch(err){
        next(err)
    }
}

// DELETE LOGIC
exports.delete = async (req,res,next) =>{
    try{
        const product = await products.findByIdAndDelete(req.params.id)
        if(!product){return res.status(404).send(`Product Not Found`)}
        res.json({
            status:200,
            message: `${product.name} has been deleted`
        })
    }catch(err){
        next(err)
    }
}

// READ PRODUCT NAME
exports.getByName = async (req,res,next) =>{
    try{
        const product = await products.findOne({
            name: new RegExp(`^${req.params.name}$`, "i")
        })
        if(!product){return res.status(404).send(`Product Not Found`)}
        res.json({
            status: 200,
            foundProduct: product
        })

    }catch(err){
        next(err)
    }
}

//final