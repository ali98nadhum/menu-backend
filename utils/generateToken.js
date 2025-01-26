const jwt = require('jsonwebtoken');


// Generate a JWT token for a user.
const generateToken = (id , username) => {
    return jwt.sign(
        { id, username },
        process.env.JWT_SECRET, 
        { expiresIn: process.env.EXPIRES_IN } 
    );
}


module.exports = {
    generateToken
}