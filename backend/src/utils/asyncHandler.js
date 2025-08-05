const asyncHandler = (requestHandler) => {
<<<<<<< HEAD

    return(res, req, next) => {
=======
    return (req, res, next) => {
>>>>>>> upstream/main
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }
}

<<<<<<< HEAD
export {asyncHandler}
=======
export { asyncHandler }
>>>>>>> upstream/main
