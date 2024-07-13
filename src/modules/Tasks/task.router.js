import * as TaskController from "./controller/task.js";
import * as validatores from "./task.validation.js"
import { Router } from "express";
import { asyncHandler } from "../../utils/errorHandling.js";
import { auth } from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";
const router=Router()


router.route('/')
    .post(auth(), validation(validatores.createTaskSchema), asyncHandler(TaskController.createTask))
    .get(auth(true), asyncHandler(TaskController.getTasks));

router.route('/:id')
    .put(auth(), validation(validatores.updateCategorySchema), asyncHandler(TaskController.updateTask))
    .delete(auth(), asyncHandler(TaskController.deleteTask));
export default router
