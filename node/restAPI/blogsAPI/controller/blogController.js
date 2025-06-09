const blog = require('../models/blogModel.js')


// GET ALL ROUTE LOGIC
exports.getAllBlogs = (req,res) =>{
    const allBlogs = blog.blogsModel()
    res.json(allBlogs)
}

// GET A BLOG BY ID ROUTE
exports.getBlogById = (id) =>{
  return foundBlog = blog.blogsModel().find(x => x.id === parseInt(id));
  
}


// POST ROUTE (Create a post)
exports.createBlog = (newBlog) =>{
   const blogs = blog.blogsModel()
   blogs.push(newBlog)
}


// PUT/PATCH ROUTE
exports.updateBlog = (id, requestBody) =>{
    const blogSelect = blog.blogsModel.find(x => x === parseInt(id))
    if(!blogSelect){return undefined}
    blogSelect.title = requestBody.title || blogSelect.title
    blogSelect.content = requestBody.content || blogSelect.content
    blogSelect.author = requestBody.author || blogSelect.author
    blogSelect.datePublished = requestBody.datePublished || blogSelect.datePublished
    res.json(blogSelect)
}

// DELETE ROUTE
exports.deleteBlog = (id) =>{
    const blogArray = blog.blogsModel()
    const index = blogArray.findIndex(x => x === parseInt(id))
    if(index < 0){return undefined}
    const removedBlog = blogArray.splice(index, 1)
    return removedBlog
}