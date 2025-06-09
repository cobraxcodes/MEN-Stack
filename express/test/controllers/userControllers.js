// import the model here
const User = require('../models/user')

// exports the usercontroller function for use outside of this file
exports.userController = (req, res) => {
  const appUsers = User.userModels(); // Fetch users from the userModels 
 res.render('index', { appUsers});
 // Render the 'users' view and pass the data
};