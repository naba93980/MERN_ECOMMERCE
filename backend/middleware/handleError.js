const { CustomErrorHandler } = require("../utils/customErrorHandler");

const errorHandler = (error, req, res, next) => {
  if (error instanceof CustomErrorHandler) {
    res.status(error.statusCode).json({ success: false, mssg: error.message });
    return;
  }
  if (error.name === 'CastError')
    res.status(400).json({ success: false, message: error.name });
    
  res.status(500).json({ success: false, message: error.message ? error.message : 'Something went wrong' });
};

module.exports = errorHandler;
