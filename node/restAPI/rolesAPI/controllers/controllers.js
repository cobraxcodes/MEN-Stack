const roles = require('../models/models.js')


// GET ALL
exports.getAll = (req, res) =>{
    res.json(roles.rolesModel());
}

// GET BY ID
exports.getById = (req,res) =>{
    const role = roles.rolesModel().find(x => x.id === parseInt(req.params.id))
    if(!role){return res.status(404).send(`No User found!`)}
    res.json({
        status: 200,
        user: role
    })
}

// create user
exports.createRole = (req,res) =>{
    const newRole = req.body
    const rolesArray = roles.rolesModel()
    rolesArray.push(newRole)

    res.json({
        status: 200,
        role: newRole
    })
}

// update role
exports.updateRole = (req,res) =>{
    const user = roles.rolesModel().find(x => x.id === parseInt(req.params.id))
    if(!user){return res.status(404).send(`No user found`)}
    user.role = req.body.role
    res.json({
        status: 200,
        message: `Role has been updated`,
        user: user
    })
}


// delete role
exports.deleteUser = (req,res) =>{
    const index = roles.rolesModel().findIndex(x => x.id === parseInt(req.params.id))
    const userArray = roles.rolesModel()
    if(index < 0 ){return res.status(404).send(`User not found`)}
    userArray.slice(index, 1)
    res.json({
        status:200,
        message: `User ${req.params.id} has been deleted!`
    })
}