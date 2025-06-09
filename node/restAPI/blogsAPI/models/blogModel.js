// {id, title, content, author, datePublished}

const blogs = [{
    id:1, title: "The complicated art of shoe laces", content: "test test test", author: "Test", datePublished: new Date ("01-01-2001"),
        id:1, title: "The complicated art of shoe laces", content: "test test test", author: "Test", datePublished: new Date ("01-01-2001"),
},{
        id:2, title: "The complicated art of pottery", content: "test test test", author: "Harry Potter", datePublished: new Date ("01-01-2004"),
},
{
        id:3, title: "The complicated art of llama keeping", content: "test me hehe test", author: "Big Boi", datePublished: new Date ("01-01-2007"),

}
]

module.exports.blogsModel =() => blogs;