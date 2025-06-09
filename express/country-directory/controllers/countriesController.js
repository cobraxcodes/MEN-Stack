const country = require('../models/countryModel.js') // importing model here


// creating a function here to exportt into app.js
exports.countryListController = (req,res) =>{
const countryList = country.countriesModel();
    res.render('index', {countryList})
} 