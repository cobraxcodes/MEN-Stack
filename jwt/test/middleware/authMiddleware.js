const { verifyToken } = require('./jwtUtils'); // importing verify token function from jwtUtils

const authenticate = (req, res, next) => { // defining a authenticating middleware function called authenticate
  const token = req.headers.authorization?.split(' ')[1]; //This checks the token send from the request header.  // splits the bearer (keyword to indicate what follows is a token)
  // from the token hence the [1] so it only grabs the token part
  console.log(token)
  if (!token) {
    return res.status(401).json({ message: 'No token provided' }); // send if token is not provided
  }

  const decoded = verifyToken(token); // if token is valid, the verify token function is the called from jwtUtils and verfies token
  
  if (!decoded) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  req.user = decoded; // if token is valid, this attached the decoded payload into user so that any other protected routes doesn't have to decode the token again in order to see if user has
  // access to the route depending on their role
  next();
};

module.exports = { authenticate };
