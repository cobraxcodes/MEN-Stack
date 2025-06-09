const mongoose = require ('mongoose')
const bcrypt = require ('bcrypt')

  // PRODUCT SCHEMA
const productsSchema = new mongoose.Schema({
    name: {type: String,
       required: true,
       minlength: 3, 
       maxlength: 50
      },
    stock: {type: Number, required: true},
    price: { type: Number, required: true,
      validator: function (value){
        return value > 0;
      },
      message: `Price must be greater than $0`
    }
})

// USER SCHEMA
const userSchema = new mongoose.Schema({
        username : {type: String, 
          required: true,
          minlength: 6,
          maxlength: 15,
          validate: {
            validator: function (value){
              return /^[A-Za-z]+$/.test(value) // .test checks if the value follows regex
            },
            message: props => `Email ${props.value} is invalid` // accessing the value from property to send back if invalid
          }
        },
        password: {type: String, 
          required: true,
          minlength: 8,
          maxlength: 15,
          validate: {
            validator: function (value) {
              return /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(value);
            },
            message: props => `Password is invalid ${props.value}`
          }
        }
})
// using pre middleware hook for hasing new/modified passwords in sign up
  userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next() // if password is not modified then send to the next error handler
    this.password = await bcrypt.hash(this.password, 10) // if so, use bycrpt.hash function that takes the password and 'salt' (how many times to run it through the hashing algorithm)
    console.log(`Hashed password before saving new user: ${this.password}`)
    next()
  })


productsSchema.pre('save', function(next){
    console.log(`Saving product: ${this.name} with ${this.stock} stock`)
    next()
}) 

productsSchema.pre('findOneAndUpdate', function (next){
  this.set({lastStockUpdate: new Date()})
  next()
})

productsSchema.post('findOne', function (doc, next) {
  if(!doc){return null}
  else{console.log(`${doc.name}`)}
  next()
})

userSchema.pre('save', function (next){
  this.username.toLowerCase()
  next()
})

const users = mongoose.model('Users', userSchema)
const products = mongoose.model('Products', productsSchema)

module.exports = {products, users}