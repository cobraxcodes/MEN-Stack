const {generateToken} = require ('./jwtUtils')

const loginUser = (req,res) =>{
    const {username, password} = req.body // destructuring the username and password sent by user inside the request body
}

// simulate pass
if(username === 'admin' && password === '1234'){  // checks if username and password are valid
    const token = generateToken ({ username, role: 'admin'}) // if valid it generates a token using the generate token function in utils
                                            // embed claims inside the token payload which is username and the role (access) they have 
    res.status(200).json({
        message: 'Login sucessful', token // if token generation is successful, it sends a message and the token itself
    })
}else{
    res.status(401).json({  // send an error if invalid
        message: 'Invalid credentials '
    })
}

module.exports = {loginUser}