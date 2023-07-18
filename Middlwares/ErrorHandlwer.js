const { CustomApiError } = require("../Errors")

const errorHandlerMiddlware =  (err,req,res,next)=>{
    let customError =
    {statusCode: err.statusCode || 500,
      msg: err.message  ||"Something went wrong try again later"}
      // Validation Error
    if (err.name === 'ValidationError') {
        customError.msg = Object.values(err.errors).map(item => item.message).join(',')
        customError.statusCode = 400
    }
    // Mongo Duplicate Key Error
    if (err.code === 11000) {
        customError.msg = `Duplicate ${Object.keys(err.keyValue)} entered`
        customError.statusCode = 400
    }
    //cast error
    if (err.name === 'CastError') {
        customError.msg = `No item found with id : ${err.value}`
        customError.statusCode = 404
    }
    // JWT Error
    if (err.name === 'JsonWebTokenError') {
        customError.msg = 'Invalid Token'
        customError.statusCode = 401
    }
    // JWT Expired Error
    if (err.name === 'TokenExpiredError') {
        customError.msg = 'Token Expired'
        customError.statusCode = 401
    }
    return res.status(customError.statusCode).json({ msg: customError.msg })

}

module.exports = errorHandlerMiddlware;
