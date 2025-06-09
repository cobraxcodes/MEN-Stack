// // // // basic syntax - for route specific errors
// // const error = new Error ('User not found')
// // //         error.status = 404
// // //         return next (error)

// // TRY-CATCH ERROR HANDLINE WITH MIDDLEWARE SYNTAX:


// // app.get('/product', (req, res, next) => { // IN APP.JS
// //   try {
// //     const data = riskyFunction()
// //     res.send(data)
// //   } catch (err) {
// //     next(err)
// //   }
// // })

// // // ONE central error handler for everything
// // basic syntax for middleware error handler
// // app.use((err, req, res, next) => {
// //   res.status(err.status || 500).json({
// //     message: err.message,
// //     status: err.status || 500
// //   })
// // })







// // // Mini Challenge 1: Handling User Not Found (404)
// // // Route: GET /userProfiles/:id
// // // If the user doesn't exist in your data, throw a 404 error saying "User not found."
// // // Make sure to pass the error to your error-handling middleware.

//             // SOLUTION:
// // const products = require ('../model/productModel.js')
// // exports.productController = (req,res) =>{
// //     const productList = products.productModel()
// //     res.render('index', {productList})
// // }

// // exports.userProfiles = (req, res, next) =>{
// //     const users = user.userModel()
// //     const findUser = users.find(user => user.id === req.params.id)

// //     if(!findUser){
// //         const error = new Error ('User not found')
// //         error.status = 404
// //         return next (error)
// // }
// // res.render('profile', {user: findUser})
// // }


// // // route in app.js
// // app.get("/userProfiles/:id", user.userProfiles)

// // app.use((req, res, next) => {
// //   res.status(404).send('Sorry, we can’t find that page!');
// // });

// //app listen goes here



        


// // ⚡ Mini Challenge 2: Async Error with Middleware
// // Route: GET /products/:id
// // Task:
// // Create a productController method to fetch a product by ID.
// // Simulate this as an async function (you can use a Promise or setTimeout).
// // If the product isn’t found, throw a 404 error and pass it to the error middleware.
// // If the product is found, respond with the product JSON.
// const products = [
//   { id: 1, product: "Bath Towel" },
//   { id: 2, product: "Shampoo" }
// ];
// modoule.exports.productModel = () => product



// const product = require ('...')


// exports.productController = async  (req,res,next) =>{
//     try{
//         const product = products.productModel()
//         const findProduct = products.find(x => x.id === req.params.id)


//         if(!product){
//             const error = new Error (`Product cannot be found`)
//             error.status = 404
//             return next(error)
//         }
//         res.render('index.ejs', req.params.id) // if rending an ejs file
//         res.json(findProduct) // if building a rest API
//     }catch(error){
//         next(error)
//     }

// } 


// app.get('/product/:id', product.productController)

// // middleware
// app.use((err,req,res,next) =>{
//     res.status(err.status).json({
//         message: error.message,
//         status: error.status
//     })
// })








// // ⚡ Mini Challenge 3: Missing Field Validation in POST
// // Route: POST /userProfiles
// // Task:
// // Create a createUser controller method.
// // Inside a try/catch block, check if name, age, and email exist in req.body.
// // If any field is missing, throw a 400 error with the message "Missing required fields: name, age, email."
// // Pass the error to the error middleware.
// // If everything’s good, respond with 201 Created and a success message.

const user = require('...')

exports.createUser = async(req, res, next) =>{
    try{
        const create = user.createUserModel
        const {name, age, email} = req.body

        // checking if required fields are filled out
        if(!name || !age || !email) {
            const error = new Error (`Missing required fields: name, age, email`)
            error.statues = 500
            return next(error)
        }
        res.status(201).send(`Succesfully created user`) // to send a successful response code with response message

    }catch(error) {
       next(error)
    }
}

// app.js
app.post('/userProfiles', user.createUser)

// middlware
app.use((err,req,res,next) =>{
    res.status(err.status || 500).json({
        message: error.message,
        status: error.message || 500
    })
})