const mongoose = require ('mongoose')

const rolesSchema = new mongoose.Schema({
    name: {type: String, required: true},
    admin: {type: Boolean, required: true},
    password: {type: String,
        required:true,
        minlength: 8,
        maxlength: 15,
        validator: function (value) {
            return /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(value);
        },
        message: props => `${props.value} is not valid. Please make a stronger password`
    }
})

rolesSchema.pre('save', function(next){
    this.name.toLowerCase()
    next()
})

rolesSchema.pre('findOneAndDelete', function (next){
    if(admin){
        console.log("Cannot delete admin role")
    }
    next()
})

const roles = mongoose.model("Roles", rolesSchema)

module.exports = roles