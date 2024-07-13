import { validation } from "../../middleware/validation.js";
import * as authController from "./controller/auth.js";
import * as validatores from "./auth.validation.js"
import { Router } from "express";
import { asyncHandler } from "../../utils/errorHandling.js";
const router=Router()

router.post('/login', validation(validatores.login), asyncHandler(authController.login));
router.post('/signup', validation(validatores.signup), asyncHandler(authController.signup));

export default router
