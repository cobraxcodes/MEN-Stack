const product = require('../models/model.js')


// GET ALL LOGIC
exports.getAll=(req,res)=>{
    res.json(product.productsModel())

}

//GET BY ID
exports.getId = (req,res) =>{
    const findProduct = product.productsModel().find(x => x.id == parseInt(req.params.id))

    console.log(findProduct)
    if(!findProduct){return res.status(404).send(`No Product Available`)}
    res.json({
        status: 200,
        product: findProduct
    })
}


// POST A PRODUCT
exports.postProduct = (req,res) =>{
    const products = product.productsModel()
    const newProduct = req.body
    products.push(newProduct)
    res.json({
        status: 200,
        message: `Product Added!`,
        product: newProduct
    })

}

// CHANGE A PRODUCT
exports.changeProduct = (req,res) =>{
    const findProduct = product.productsModel().find(x => x.id === parseInt(req.params.id))
    if(!findProduct){return res.status(404).send(`Product Not Found!`)}
   findProduct.id = req.body.id || findProduct.id
    findProduct.name = req.body.name || findProduct.name
    findProduct.price = req.body.price || findProduct.price
    findProduct.stock = req.body.stock || findProduct.stock
    
    res.json({
        status: 200,
        message: `Product ${req.params.id} updated`,
        product: findProduct
    })
}

//DELETE A PRODUCT
exports.deleteProduct = (req, res) =>{
    const index = product.productsModel().findIndex(x => x.id === parseInt(req.params.id))
    if(index < 0){return res.status(404).send(`Movie Not Found!`)}
    const products = product.productsModel()
    products.slice(index,1)
    res.json({
        status:200, 
        message: `Successfully deleted product ${req.params.id}`
    })
}