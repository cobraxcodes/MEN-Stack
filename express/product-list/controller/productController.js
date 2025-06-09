const products = require ('../model/productModel.js')



exports.productController = (req,res) =>{
    const productList = products.productModel()
    res.render('index', {productList})
}
