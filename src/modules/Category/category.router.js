import * as CategoryController from "./controller/category.js";
import * as validatores from "./category.validation.js"
import { Router } from "express";
import { asyncHandler } from "../../utils/errorHandling.js";
import { auth } from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";
const router=Router()

router.route('/')
  .post(auth(), validation(validatores.createCategorySchema), asyncHandler(CategoryController.createCategory))
  .get(auth(), asyncHandler(CategoryController.getAllCategories));

router.route('/:id')
  .put(auth(), validation(validatores.updateCategorySchema), asyncHandler(CategoryController.updateCategory))
  .delete(auth(), asyncHandler(CategoryController.deleteCategory));

export default router
