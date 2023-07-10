const jwt = require('jsonwebtoken');
const {UnauthorizedError} = require('../Errors')
const authenticated = (req,res,next)=>{
    const tokenWithBearer = req.headers.authorization;
    if(!tokenWithBearer ||!tokenWithBearer.startsWith('Bearer ')){
        throw new UnauthorizedError("Authentication invalid")
    }
    const token = tokenWithBearer.split(' ')[1];
    try {
        const payload = jwt.verify(token,process.env.JWT_SECERT);
        req.user = {userId: payload.userId};
        next()
    } catch (error) {
        throw new UnauthorizedError("Authentication invalid")
    }
}

module.exports = authenticated