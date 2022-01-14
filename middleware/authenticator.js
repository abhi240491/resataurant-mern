const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../config/keys')

exports.authenticateJWT = (req,res,next) => {
    const token = req.cookies.token;
    if(!token) 
        return res.status(401).json({
            errorMessage: 'No token. Authorization denied',
        })

    try{
        const decodedJWT = jwt.verify(token,jwtSecret);
        req.user = decodedJWT.user;
        next();
    }
    catch(err){
        console.log('jwt error',err);
        res.status(401).json({
            errorMessage: 'Invalid token'
        })
    }
    console.log(token)
}