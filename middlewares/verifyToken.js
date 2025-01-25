const jwt = require("jsonwebtoken");


// verify Token
function verifyToken(req , res , next){
    const authToken = req.headers.authorization;
    if(authToken){
        const token = authToken.split(" ")[1];
        try {
            const decodedPayload = jwt.verify(token , process.env.JWT_SECRET);
            req.user = decodedPayload;
            next();
        } catch (error) {
            return res.status(401).json({message:"invalid token"})
        }
    } else {
        return res.status(401).json({message:"you are not logged"})
    }
}

module.exports = {
    verifyToken
}