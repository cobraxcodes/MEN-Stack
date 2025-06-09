// // //                         // BASIC SYNTAX FOR EXPRESS
// // // // require express module
// // // const express = require('express')
// // // // create the express app
// // // const app = express()
// // // // setting the port here
// // // const port = 3000

// // // // configure the app (app.set)

// // // // mounting any middleware here (app.use)


// // // // mount the route
// // // app.get('/', (req,res) =>{
// // //     res.send('Hello from server js')
// // // })

// // // // telling the app that the port will be on port 300
// // // app.listen(port, ()=>{
// // //     console.log(`Server runnign on port:${port}`)
// // // })




// //                     // MINI CHALLENGES

// // // 📌 Challenge 1: Basic Server + Routes
// // // Set up an Express server.
// // // Create 3 routes:
// // // / → responds with “Home Page”
// // // /about → responds with “About Page”
// // // /contact → responds with a JSON { "email": "you@example.com" }
// // const express = require('express')
// // const app = express()
// // const port = 3000

// // app.use(express.static('public'))


// // app.get('/' , (req,res) =>{
// //     res.send("This is the homepage")
// // })
// // app.get('/about',(req,res) =>{
// //     res.send("This is the About Page")
// // })
// // app.get('/contact', (req,res) =>{
// //     res.json({"email": "you@example.com"})
// // })

// // app.listen(port, ()=>{
// //     console.log(`Server is running at ${port}`)
// // })


// // // 📌 Challenge 2: Dynamic Route with Parameters
// // // Add a new route:
// // // /greet/:name
// // // It should respond with Hello, {name}!
// // // Example: /greet/Joe → Hello, Joe!
// // // Hint: Use req.params.name
// // app.get('/greet/:name', (req,res) =>{
// //     res.send(`Hello, ${req.params.name}` )
// // })



// // // 📌 Challenge 3: Serve Static Files
// // // Create a public folder
// // // Put an index.html file inside it.
// // // Use express.static() middleware to serve files from that folder.
// // // When visiting http://localhost:3000/index.html, it should display your HTML page.

// // // this is the middleware
// // app.use(express.static('public'))




// // // 📌 Challenge 4: Middleware Practice
// // // Create a simple middleware function that logs the request method and URL.
// // // Apply it globally so it logs every incoming request before reaching routes.
// // // Hint:
// // // javascript
// // // Copy
// // // Edit
// // // app.use((req, res, next) => {
// // //   console.log(`${req.method} ${req.url}`);
// // //   next();
// // // });

// // app.use((req,res,next) =>{
// //     console.log(`${req.method} ${req.url}`)
// //     next()
// // })



// // // 📌 Challenge 5: Handle JSON POST Requests
// // // Use express.json() middleware.
// // // Create a POST route /api/data that accepts a JSON body:
// // // json
// // // Copy
// // // Edit
// // // { "message": "Hello Server" }
// // // Respond back with:
// // // json
// // // Copy
// // // Edit
// // // { "received": "Hello Server" }

// // app.use(express.json())

// // app.post('/api/data', (req,res) =>{
// //     res.json({recieved: req.body.message})
// // })





//                         // EJS 
// const express = require('express')
// const path = require('path')
// const app = express()
// const port = 3000

// // adding templating engine tool: to separate frontend (presentation layer) from backend (logic)
// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'ejs')

// // // adding app.use (middleware) to dynamically render html files
// app.use(express.static('public')) // no public directory for now


// // route
// app.get('/', (req,res) =>{
//     const user = {name : "Cobra", count: 44}
//     res.render('index', user) // renders ejs template that has the name index
// })

// // listen
// app.listen(port, () =>{
//     console.log(`Server is running at port ${port}`)
// })