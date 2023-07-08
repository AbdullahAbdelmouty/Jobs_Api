const CustomApiError = require("./customApiError");

class UnauthorizedError extends CustomApiError{
    constructor(message){
        super(message);
        this.statusCode = 401;
    }
}

module.exports = UnauthorizedError;