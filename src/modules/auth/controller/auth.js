
import { StatusCodes } from "http-status-codes";
import sendSuccessResponse from "../../../utils/sendSuccessResponse.js";
import User from "../../../../DB/model/User.model.js";
import { compare } from "../../../utils/HashAndCompare.js";
import { generateToken } from "../../../utils/GenerateAndVerifyToken.js";

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !( compare({plaintext:password, hashValue:user.password}))) {
    return next(new ErrorClass("Invalid email or password", StatusCodes.UNAUTHORIZED));
  }
  const token =  generateToken({ payload :{ _id: user._id }})
  const { password: pwd, ...userWithoutPassword } = user.toObject();
  sendSuccessResponse(res, StatusCodes.OK, "user is logged successfully", { admin: userWithoutPassword, token });
};
export const signup = async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    sendSuccessResponse(res, StatusCodes.CREATED, "User registered successfully", { user: user });
  };