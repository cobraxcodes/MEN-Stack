
const express = require('express')
const app = express()
const port = 3000
const blogs = require('./controller/blogController.js')

// templating engine
app.set('view engine' , 'ejs')


// middleware
app.use(express.json())


//routes
// GET all posts, GET one post, POST new post, PUT update post, DELETE post

// GET ALL ROUTE (does not contain request or response because there's no body needed inside request and response
app.get('/blogs', blogs.getAllBlogs)

//GET a blog by id
app.get('/blogs/:id', (req,res) =>{
    const foundBlog = blogs.getBlogById(req.params.id)
    if(!foundBlog){res.status(404).send(`Blog Not Found`)}
   res.status(200).json(foundBlog)
})

// POST Route (to create a new user)
app.post('/blogs', (req,res) =>{
    const newBlog = req.body
    blogs.createBlog(newBlog)
    res.json({
        status: 200,
        message: `Successfully created new blog`,
        blog: {newBlog}       
    })
})

// PUT Route (update a user) // STILL UNCLEAR HOW THIS WORKS
app.put('/blogs/:id', (req,res)=>{ 
    const blog = (req.params.id, req.body)
    if(!blog){res.status(404).send(`Resource not found`)}
    res.json({
        status: 200,
        message: `Blog ${req.params.id}'s information has been updated`,
        blog: {blog}
    })
})



// DELETE
app.delete('/blogs/:id', (req,res) =>{
    const removedBlog = blogs.deleteBlog(req.params.id)
    if(!removedBlog){return undefined}
    res.json({
        status:200,
        message: `Successfully deleted blog id: ${req.params.id}`
    })
})


// port
app.listen(port, ()=>[
    console.log(`Server is listening on port ${port}`)
]) 

