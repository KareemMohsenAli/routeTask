import joi from "joi";
import { generalFields } from "../../middleware/validation.js";

export const createCategorySchema = joi
  .object({
    name: generalFields.name,
  })
  .required();



export const updateCategorySchema = joi
.object({
  name: generalFields.name,
  id: generalFields.id
})
.required();



