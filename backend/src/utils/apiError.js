class ApiError extends Error {
<<<<<<< HEAD
    constructor(
        statusCode,
        message="something wrong",
        errors=[],
        stack=""
    ) {
        super(message)
        this.message = message
        this.statusCode = statusCode
        this.errors = errors
        this.data = null
        this.success = false

        if (stack) {
        this.stack = stack
    }
    else{
        Error.captureStackTrace(this, this.constructor)
    }
    }

=======
    constructor(statusCode, message = "something went wrong", errors = [], stack="") {
        super(message)
        this.statusCode = statusCode,
        this.message = message,
        this.data = {},
        this.success = false,
        this.errors = errors


        if(stack){
            this.stack = stack
        }
        else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
>>>>>>> upstream/main
}

export {ApiError}