const books = require('../model/model.js')

// CREATE book logic = create
exports.create = async (req, res, next) =>{
    try{
        const allBooks = await books.find()
        const newBook = new books (req.body)
        const savedBook = await newBook.save()
        allBooks.push(newBook)
        res.json({
            status: 200,
            message: `New Book added!`,
            book: savedBook
        })
    }catch(err){
        next(err)
    }
}


// GET ALL logic = read
exports.getAll = async (req,res, next) =>{
    try{
        const allBooks = await books.find()
        res.json(allBooks)

    }catch(err){
        next(err)
    }
}

// UPDATE logic = update
exports.update = async (req,res,next) =>{
    try{
      const book = await books.findById(req.params.id)
      
      if(!book){return res.status(404).send(`Book Not Found!`)}

      const updatedBook = await books.findByIdAndUpdate(req.params.id, {
        title: req.body.title ?? book.title,
        author: req.body.author ?? book.author,
        pages: req.body.pages ?? book.pages,
        published: req.body.published ?? book.published
      },{ new:true, runValidators: true }
    )
      res.json({
        status:200,
        message: `${updatedBook.title} has been updated`,
        update: updatedBook
      })
    }catch(err){
        next(err)
    }
}


// DELETE BOOK LOGIC = delete
exports.delete = async (req, res, next) => {
    try{
        const book = await books.findByIdAndDelete(req.params.id)
        if(!book){return res.status(404).send(`Book not found!`)}
        res.json({
            status:200,
            message: `${book.title} has been deleted`,
            deletd: book
        })
    }catch (err) {
        next(err);
    }
};

// get by name
exports.getByName = async (req, res, next) => {
    try {
        const book = await books.findOne({ 
            title: new RegExp(`^${req.params.title}$`, "i") // ✅ Case-insensitive title match
        });
        console.log("Requested title param:", req.params.title);


        if (!book) {
            return res.status(404).send("Book Not Found!");
        }

        res.json({
            status: 200,
            foundBook: book
        });

    } catch (err) {
        next(err);
    }
};
