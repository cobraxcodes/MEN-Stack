const bcrypt = require ('bcrypt')
const client = require ('../utils/redis.js')
const {orders, users} = require ('../model/model.js')
const {createToken} = require ('../utils/jwtUtils.js')
const blackList = [] // to keep track of logged out tokens
exports.blackList = blackList

// SIGN UP LOGIC
exports.signup = async (req, res, next) =>{
    try{
        const {username, password} = req.body // takes and destructures body from the request
        if(username < 6){ // ensure that username is not lesser than 6 char. if so, sends a 401
            return res.status(401).json({message: `Username must be longer than 6 characters`})
        }
        if(password < 6){ // same thing here with the username
            return res.status(401).json({message: 'Password must be longer than 8 characters'})
        }
        const existingUser = await users.findOne({username}) // if username and password are good, it checks if there is already a username in the database (prevents duplicates)
        if(existingUser){ // if so , sends a 401 again
            return res.status(401).json({message: 'Username exists. Please choose another username!'})
        }

        const newUser = new users ({username, password}) // if there is no existing username, then the new user is created with its username and password
        const saveUser = await newUser.save() // saves it :)
        const token = createToken ({username}) // and of course, creates a token to access protected routes 
        res.status(200).json({message: `User ${saveUser.username} sucessfully created!`, token}) 
    }catch(err){
        next(err)
    }
}


// LOGIN LOGIC (SIMULATION)
exports.loginUser = async (req, res,next) =>{
    try{
        const {username, password} = req.body
        const user = await users.findOne({username})
        if(!user){
            return res.status(404).json({message: 'User Not Found!'})
        }
        const matchPassword = await bcrypt.compare(password, user.password)
        if(!matchPassword){
            res.status(404).json({message: 'Password is invalid!'})
        }
        const token = createToken({username: user.username})
        res.status(200).json({mesage: `Login succesful!`, token})

    }catch(err){
        next(err)
    }
}

// LOGOUT LOGIC
exports.logoutUser = (req,res,next) =>{
    try{
        const token = req.headers.authorization?.split(' ')[1] // takes the token and splits it from the bearer
        if(!token){ // if no token is provided send a 201
            res.status(201).json({message: 'No token provided!'})
        }
        if(token){ // if there is a token
            blackList.push(token) // add token in the blacklisted list so that it may not be used again when trying to access routes
            console.log(`Blacklisted tokens: ${blackList}` )
            return res.status(200).json({
                message: `Logout Successful!`
            })
        }
    }catch(err){
        next(err)
    }
}


// DELETE USER logic
exports.deleteUser = (req,res,next) => {
    try{
        const findUser = users.findOneAndDelete({username: RegExp(`^${req.params.username}$`, "i") })
        if(!findUser){
            return res.status(404).json({message:'User Not Found!'})
        }
        return res.status(200).json({message: `User succesfully deleted!`})

    }catch(err){
        next(err)
    }
}




// CREATE logic
exports.create = async (req,res,next) =>{
    try{
        const allOrders = await orders.find()
        const newOrder = new orders (req.body)
        const saveNewOrder = newOrder.save()
        allOrders.push(newOrder)
        res.json({
            status: 200,
            message: `New Order Created!`,
            order: newOrder
        })
    }catch(err){
        next(err)
    }
}


// READ logic
exports.getAll = async(req,res,next) =>{
    try{
        const allOrders = await orders.find()
        res.json({
            status:200,
            orders: allOrders
        })
    }catch(err){
        next(err)
    }
}

// UPDATE logic
exports.update = async (req,res,next) =>{
    try{
        const order = await orders.findById(req.params.id)

        if(!order){return res.status(404).send(`No Order Found!`)}

        const orderToUpdate = await orders.findByIdAndUpdate(req.params.id, {
            name: req.body.name ?? order.name,
            quantity: req.body.quantity ?? order.quantity,
            total: req.body.total ?? order.total
        })
        res.json({
            status:200,
            message: `Successfully updated ${order.name}`,
            updatedOrder: order
        })
    }catch(err){
        next(err)
    }
}

// DELETE logic
exports.deleteOrder= async (req,res,next) =>{
    try{
        const orderToDelete = await orders.findByIdAndDelete(req.params.id)
        if(!orderToDelete){return res.status(404).send(`No Order Found!`)}
        res.json({
            status: 200,
            message: `${orderToDelete.name} deleted!`,
            deleted: orderToDelete
        })
    }catch(err){
        next(err)
    }
}

// GET BY NAME logic
exports.getByName = async (req, res, next) => {
  try {
    const cachedOrderName = `order:${req.params.name.toLowerCase()}`

    const cachedOrder = await client.get(cachedOrderName)
    if (cachedOrder) {
      console.log(`Retrieved product from cache: ${cachedOrderName}`)
      return res.json(JSON.parse(cachedOrder))
    }

    console.log('Retrieved order from database')
    const orderName = await orders.findOne({
      name: RegExp(`^${req.params.name}$`, 'i')
    })
    if (!orderName) {
      return res.status(404).json({ message: 'Order Not Found' })
    }

    await client.setEx(cachedOrderName, 30, JSON.stringify({
      status: 200,
      order: orderName
    }))

    res.json({
      status: 200,
      order: orderName
    })

  } catch (err) {
    next(err)
  }
}

// exports.getByName = async (req,res,next) =>{
//     try{
//         const cachedOrderName = `order: ${req.params.name.toLowerCase()}`
//         const cachedOrder = await client.get(cachedOrderName)
//         if (cachedOrder){
//             console.log(`Retrieved product from cache`)
//             return res.json(JSON.parse(cachedOrder))
//         }
//         console.log('Retrieved order from database')
//         const orderName = await orders.findOne({
//             name: RegExp((`^${req.params.name}$` ,"i"))
//         })
//         if(!orderName){return res.status(404).json({message: 'Order Not Found'})}
        
//           await client.setEx(cachedOrderName, 30, JSON.stringify({
//             status: 200,
//             order: orderName
//             }))
//                 res.json({
//             status: 200,
//             order: orderName
//         })
//     }catch(err){
//         next(err)
//     }
// }