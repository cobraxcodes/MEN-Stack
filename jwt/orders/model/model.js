const mongoose = require ('mongoose')
const bcrypt = require ('bcrypt')


const ordersSchema = new mongoose.Schema ({
    name: {type: String, required: true},
    quantity: {type: Number, required: true},
    total: {type: Number, required: true},
})


const userSchema = new mongoose.Schema({
    username: {type: String, 
        required: true,
        minlength: 6,
        maxlength: 15,
        validate: {
            validator: function (value) {
                return /^[A-Za-z]+$/.test(value)
            },
            message: props => `${props.value} is not valid.`
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 15,
        validate: {
          validator: function (value) {
         return /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(value);
        },
        message: props => `${props.value} is not valid. Please make a stronger password!`
    }
},
})

userSchema.pre('save', function(next) {
    this.username = this.username.toLowerCase() // converts username before saving it to database
    next()
})
userSchema.pre('save', async function(next){ // hashes user name before saving it to database
    this.password = await bcrypt.hash(this.password, 10)  // using bcrypt hash to "salt" (run password through hashing algorithm 10 times)
    console.log(`Hashed password: ${this.password}`)
    next()
})

const orders = mongoose.model('Orders', ordersSchema)
const users = mongoose.model('Users', userSchema)




module.exports = {orders , users}