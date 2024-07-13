import joi from "joi";
import { generalFields } from "../../middleware/validation.js";

export const createTaskSchema =joi.object({
  type: joi.string().valid('text', 'list').required(),
  text: joi.string().optional(),
  listItems: joi.array().items(joi.string()).optional(),
  shared: joi.boolean().optional(),
  category: joi.string().required()
});



export const updateCategorySchema = joi.object({
  type: joi.string().valid('text', 'list').optional(),
  text: joi.string().optional(),
  listItems: joi.array().items(joi.string()).optional(),
  shared: joi.boolean().optional(),
  category: joi.string().optional(),
  id:generalFields.id
});



