const { get } = require('mongoose')
const event = require ('../model/model.js')

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
        const allEvents = await event.find()
        res.json({
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