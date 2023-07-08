const { CustomApiError } = require("../Errors")

const errorHandlerMiddlware =  (err,req,res,next)=>{
    if (err instanceof CustomApiError) {
        return res.status(err.statusCode).json({ msg: err.message })
      }
      return res
        .status(400)
        .send('Something went wrong try again later')
}

module.exports = errorHandlerMiddlware;