// Schema: { eventName: String, date: Date, location: String }

const mongoose = require ('mongoose') // adding mongoose depency to create schema in database
const bcrypt = require ('bcrypt')

const eventSchema = new mongoose.Schema({ //creating an event schema here
    name: {type: String, required: true},
    date: {type: Date, required: true},
    location: {type: String, required: true}
})

 const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 15,
        validate: {
            validator: function (value){
                 return /^[A-Za-z]+$/.test(value)
            },
            message: props => `Invalid username ${props.value}`
        }
        
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 15,
        validate: {
            validator: function (value){
             return /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(value);
            },
            message: props => `Password invalid ${props.value}`
        }
        
    }
})

userSchema.pre('save', async function(next){
    this.password = await bcrypt.hash(this.password, 10)
    console.log(`Hashed password: ${this.password}`)
    next()
})

const event = mongoose.model('Events', eventSchema)
const users = mongoose.model(`Users`, userSchema)

module.exports = {event, users}