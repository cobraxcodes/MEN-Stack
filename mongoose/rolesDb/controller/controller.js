const roles = require ('../model/model.js')

// create
exports.create = async (req,res,next) =>{
    try{
        const role = new roles(req.body)
        const saveNewRole = role.save()
        res.json({
            status: 200,
            message: "New Role created!"
        })
    }catch(err){
        next(err)
    }
}

// read
exports.getAll = async (req,res,next) =>{
    try{
        const allRoles = await roles.find()
        res.json({
            status:200,
            roles: allRoles
        })
    }catch(err){
        next(err)
    }
}
// update
exports.update = async (req,res,next) =>{
    try{
        const oldRole = await roles.findById(req.params.id)
        if(!oldRole){return res.status(404).send(`Role Not Found`)}
        const updateRole = await roles.findByIdAndUpdate(req.params.id, {
            name: req.body.name ?? oldRole.name,
            admin: req.body.admin ?? oldRole.admin
        })
        res.json({
            status:200,
            message: `${oldRole.name} updated!`,
            role: updateRole
        })
    }catch(err){
        next(err)
    }
}

// delete
exports.delete = async(req,res,next) =>{
    try{
        const role = roles.findByIdAndDelete(req.params.id)
        res.json({
            status: 200,
            message: `Role has been deleted`
        })
    }catch(err){
        next(err)
    }
}


// get by name
exports.getByName = async (req,res,next) =>{
    try{
        const foundByName = await roles.findOne({
            name: new RegExp (`^${req.params.name}$`, "i")
        })
        if(!foundByName){return res.status(404).send(`Role Not Found`)}
        res.json({
            status:200,
            role: foundByName
        })

    }catch(err){
        next(err)
    }
}

// final