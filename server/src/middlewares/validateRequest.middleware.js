import { validationResult } from "express-validator";
import asyncHandler from "../utils/async_handler.js";
import ApiError from "../utils/ApiError.js";

const validateRequest = asyncHandler(async(req, res, next) => {
    const errors = validationResult(req);
    const simplifiedErrors = {};
    if(!errors.isEmpty()){
        errors.array().forEach(error => {
            if(!simplifiedErrors[error.path]){
                simplifiedErrors[error.path] = error.msg
            }
        });
        return res.status(400).json(new ApiError("Invalid Request", simplifiedErrors));
    }
    next();
})

export default validateRequest;
