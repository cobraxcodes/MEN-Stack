// {id, name, email, role}

const roles = [{
    id: 1, name:"Cobra", email: "cobra@testmail.com", role: "admin"
},{
    id:2, name: "Kitty", email: "kitty@testmail.com", role: "user"
},{
    id:3, name: "Test", email: "test@testmail.com", role: "user"
},{
    id:4, name: "Tetay", email: "tetay@testmail.com", role:"user"
}
]

module.exports.rolesModel = () => roles