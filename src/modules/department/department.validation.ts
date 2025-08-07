import Joi from "joi";
import { Types } from "mongoose";

export const createDepartmentSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  description: Joi.string().min(100).max(5000).required(),
  manager: Joi.string().custom((value, helpers) => {
    if (!Types.ObjectId.isValid(value)) return helpers.error("any.invalid");
    return value;
  }),
});

export const updateDepartmentSchema = Joi.object({
  name: Joi.string().min(2).max(100).optional(),
  description: Joi.string().min(100).max(5000).optional(),
  manager: Joi.string()
    .custom((value, helpers) => {
      if (!Types.ObjectId.isValid(value)) return helpers.error("any.invalid");
      return value;
    })
    .optional(),
});
