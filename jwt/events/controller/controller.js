const client = require ('../utils/redis.js')
const bcrypt = require ('bcrypt')
const {event, users} = require ('../model/model.js') // use users for later
const {generateToken} = require ('../utils/jwtUtils.js')
const blackListTokens = []
exports.blackListTokens = blackListTokens

// SIGNUP
exports.signup = async (req,res,next) =>{
    console.log('signup route hit!')
    try{
        const {username, password} = req.body
        if(username.length < 6){
            return res.status(403).json({message: 'Username must be longer than 6 characters'})
    
        }
        if(password.length < 8){
            return res.status(403).json({message: 'Password must be longer than 8 characters'})
        }
        const existingUser = await users.findOne({username})
        if(existingUser){
            return res.status(403).json({message: 'User exists! Please enter a different username'})
        }
        const newUser = new users ({username, password})
        const saveNewUser = await newUser.save()
        const token = generateToken ({username})
         res.status(201).json({message: `User ${saveNewUser.username} created!`, token})
    }catch(err){
        next(err)
    }
}


// LOG IN 
exports.login = async (req,res,next) =>{
    try{
       const {username, password} = req.body
        const user = await users.findOne({username})
        if(!user){
            res.status(400).json({message: "User Not Found"})
        }
        const passwordMatch = await bcrypt.compare(password, user.password)
        if(!passwordMatch){
            res.status(400).json({message: 'Password is invalid!'})
        }
        const token = generateToken({username: user.name})
        res.status(200).json({
            message: `User ${user.username} succesfully logged in`, token
        })
    }catch(err){
        next(err)
    }
}

// LOGOUT LOGIC
exports.logout = (req,res,next) =>{
    try{
        const token = req.headers.authorization?.split(' ')[1]
        if(!token){res.status(403).json({message: 'No token provided!'})}
        if(token){
            blackListTokens.push(token)
            return res.status(201).json({
                message: `Logged out successfully! `
            })
        }
    }catch(err){
        next(err)
    }
}





// DELETE ROUTE
exports.deletUser = async (req,res,next) =>{
    const findUser = await users.findOneAndDelete({
        username: new RegExp(`^${req.params.username}$`, "i")
    })
    if(!findUser){
        res.status(400).json({
            message: "User Not Found"
        })
    }
    res.status(200).json({
        message: 'User succesfully deleted!'
    })
}


// CREATE Logic
exports.create = async (req,res,next) =>{
    try{
        const events = await event.find() // wait to find events document
        const newEvent = new event (req.body) // create a new event with the info provided in request body
        const save = await newEvent.save() // awaits for the new event to be compeleted and then saves the new event created
        events.push(newEvent) // add the new event into the events document
        
        res.json({
            status: 200,
            message: `${req.body.name} event created!`,
            event: save
        })
    }catch(err){
        next(err)
    }
}


//READ logic
exports.all = async(req,res,next) =>{
  try{
    const cachedEvents = await client.get('events')
    if(cachedEvents){
        console.log('Retrieving events from cache')
        return res.json(JSON.parse(cachedEvents))
    }
    const allEvents = await event.find()
    await client.setEx('events', 15, JSON.stringify(allEvents))
    console.log('Retrieved events from database')
    return res.json({
        status: 200,
        events: allEvents
    })
  }catch(err){
    next(err)
  }
}

//UPDATE LOGIC
exports.update = async (req,res,next) =>{
    try{
        const eventName = await event.findOne({ //mongoose function to findOne event that coincides with the req.params.name
            name: new RegExp(`^${req.params.name}$`, "i") // make this express case insensitive
        })

        if(!eventName){return res.status(404).send(`Event not found`)}

        const updateEvent = await event.findOneAndUpdate({name: new RegExp (`^${req.params.name}$`, "i")},  // uses mongoose findOneAndUpdate function after retrieving the document from the name
        {
            name: req.body.name ?? eventName.name,
            date: req.body.date ?? eventName.date,
            location: req.body.location ?? eventName.location
        }, {new: true, runValidators: true} // tells that the changes in the document are new and sees if required areas are met
    )
        res.json({
            status: 200,
            message: `${req.body.name ?? eventName.name} has been updated`,
            updatedEvent: updateEvent
        })
    }catch(err){
        next(err)
    }
}

//DELETE logic
exports.delete = async(req,res,next) =>{
    try{
        const deleteEvent = await event.findByIdAndDelete(req.params.id)
        console.log(deleteEvent)
        if(!deleteEvent){return res.status(404).send(`Event Not Found`)}
        res.json({
            status:200,
            message: `${deleteEvent.name} has been deleted`,
            deleted: deleteEvent
        })
    }catch(err){
        next(err)
    }
}


// GET BY NAME
exports.getByName = async (req,res,next) =>{
    try{
        const getName = await event.findOne( {
            name: new RegExp(`^${req.params.name}$`, "i")

        }) 
        console.log(getName)

        if(!getName){return res.status(404).send(`Event Not Found`)}
        res.json({
            status: 200,
            message: `${getName.name} found`,
            foundEvent: getName
        })
    }catch(err){
        next(err)
    }
}