import jwt from "jsonwebtoken"
import { StatusCodes } from "http-status-codes";
import { ErrorClass } from "../utils/errorClass.js";
import { asyncHandler } from "../utils/errorHandling.js";
import User from "../../DB/model/User.model.js";

export const auth = (optional = false) => {
    return asyncHandler(async (req, res, next) => {
        const { authorization } = req.headers;
        
        if (!authorization) {
            if (optional) {
                return next();
            } else {
                return next(new ErrorClass("Authorization is required", StatusCodes.BAD_REQUEST));
            }
        }

        if (!authorization.startsWith(process.env.TOKEN_BEARER)) {
            return next(new ErrorClass("Invalid Bearer key", StatusCodes.BAD_REQUEST));
        }

        const token = authorization.split(process.env.TOKEN_BEARER)[1];
        if (!token) {
            return next(new ErrorClass("Token is required", StatusCodes.BAD_REQUEST));
        }

        try {
            const decoded = jwt.verify(token , process.env.TOKEN_SIGNITURE)

            if (!decoded?._id) {
                return next(new ErrorClass("Invalid token payload", StatusCodes.BAD_REQUEST));
            }
            const user = await User.findById(decoded._id).select('-password');
            if (!user) {
                return next(new ErrorClass("Not registered account", StatusCodes.BAD_REQUEST));
            }
            req.user = user;
        } catch (error) {
            if (optional) {
                return next();
            } else {
                return next(new ErrorClass("Invalid token", StatusCodes.BAD_REQUEST));
            }
        }

        return next();
    });
};
