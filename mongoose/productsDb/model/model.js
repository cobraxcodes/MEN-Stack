const mongoose = require ('mongoose')

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

const products = mongoose.model('Products', productsSchema)

module.exports = products