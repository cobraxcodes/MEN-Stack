const users = [{
    id: 1, name: "Cobra", email: "Cobrax@testmail.com"
},{
    id:2, name: "X", email: "Xemail@testmail.com"
},{
    id:3, name: "test", email: "testme@testmail.com"
}
]

module.exports.getUsersModel = () => users
// //deleting user by id
// module.exports.removeUser = (id) =>{
//     const index = users.find(x => x.id === parseInt(id))
//     if(!index === -1){return undefined}
//    const removeUser =  users.splice(index, 1)
//     return removeUser
// }