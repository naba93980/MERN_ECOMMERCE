class CustomErrorHandler extends Error {
    constructor(message, statusCode){
        super(message)
        this.statusCode=statusCode
        Error.captureStackTrace(this, this.constructor)
    }
}

function CreateCustomError(message, statusCode){
    return new CustomErrorHandler(message,statusCode)
}
module.exports = {
    CustomErrorHandler,
    CreateCustomError
}