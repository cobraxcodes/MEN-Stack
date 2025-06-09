const movies = [{
    id: 1, title: "Shrek", year: 2004
},
{
    id:2, title: "Solar Opposites", year: 2022
},
{
    id: 3, title: "Rick and Morty", year: 2015
}
]


//exports this function to be used inside the controller
// whenever called, it returns the movies object above
module.exports.moviesModel = () => movies