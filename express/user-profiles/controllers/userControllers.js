const user = require('../models/userModels.js')


exports.userList = (req,res) =>{
    const userController = user.userModel()
    res.render('index', {userController})
}