// Schema: { eventName: String, date: Date, location: String }

const mongoose = require ('mongoose') // adding mongoose depency to create schema in database

const eventSchema = new mongoose.Schema({ //creating an event schema here
    name: {type: String, required: true},
    date: {type: Date, required: true},
    location: {type: String, required: true}
})


const events = mongoose.model('Events', eventSchema)

module.exports = events