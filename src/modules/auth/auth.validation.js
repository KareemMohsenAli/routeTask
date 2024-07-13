import joi from "joi";
import { generalFields } from "../../middleware/validation.js";

export const signup = joi
  .object({
    email: generalFields.email.required(),
    password: generalFields.password,
    name: generalFields.name,
  })
  .required();

  export const login = joi
  .object({
    email: generalFields.email,
    password: generalFields.password,
  })
  .required();
