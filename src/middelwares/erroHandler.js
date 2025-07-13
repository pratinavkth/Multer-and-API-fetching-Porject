const ApiError = require("../utils/ApiError");
const errorHandler=(err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Interna Server Issue";
    res.status(statusCode).json({
        success:false,
        message,
        stack:err.stack,

    });
}

module.exports = errorHandler;