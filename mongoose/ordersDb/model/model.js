const mongoose = require ('mongoose')


const ordersSchema = new mongoose.Schema ({
    name: {type: String, required: true},
    quantity: {type: Number, required: true},
    total: {type: Number, required: true}
})

const orders = mongoose.model('Orders', ordersSchema)


module.exports = orders