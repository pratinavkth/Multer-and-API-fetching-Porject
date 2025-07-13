class ApiError extends Error{
    constructor(statusCode,message,stack=''){
        super(message);
        this.statusCode = statusCode;
        this.name='ApiError';
        if(stack){
            this.stack = stack;
        }else{
            Error.captureStackTrace(this,this.constructor);
        }
    }
} 

module.exports = ApiError;