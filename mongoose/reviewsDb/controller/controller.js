const reviews = require ('../model/model.js')

// create logic
exports.create = async (req,res,next) =>{
    try{
        const newReview = new reviews (req.body)
        const saveReview = await newReview.save()
        res.json({
            status: 200,
            message: `Review Created!`,
            review: newReview
        })

    }catch(err){
        next(err)
    }
}

//read logic
exports.getAll = async(req,res,next) =>{
    try{
        const allReviews = await reviews.find()
        res.json({
            status: 200,
            reviews: allReviews
        })

    }catch(err){
        next(err)
    }
}

//update logic
exports.update = async(req,res,next) =>{
    try{
        const review = await reviews.findById(req.params.id)
        if(!review){return res.status(404).send(`Review Not Found`)}
        const foundReview = await reviews.findByIdAndUpdate(req.params.id, {
            name: req.body.name ?? review.name,
            comment: req.body.comment ?? review.comment
        })
        res.json({
            status: 200,
            message: `Successfully updated ${review.name}`,
            update: review
        })

    }catch(err) {
        next(err)
    }
}
//delete logic
exports.delete = async(req,res,next) =>{
    try{
        const review = reviews.findByIdAndDelete(req.params.id)
        if(!review){return res.status(404).send(`Review Not Found`)}
        res.json({
            status:200,
            mesage: `Review deleted`
        })

    }catch(err){
        next(err)
    }
}

//get by name logic
exports.getByName = async (req,res,next) =>{
    try{
        const review = await reviews.findOne({
            name: new RegExp (`^${req.params.name}$`, "i")
        })
        if(!review){return res.status(404).send(`Review Not Found`)}
        res.json({
            status:200,
            foundReview: review
        })
    }catch(err){
        next(err)
    }
}