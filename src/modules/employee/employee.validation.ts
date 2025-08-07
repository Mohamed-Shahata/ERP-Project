import Joi from "joi";
import { Types } from "mongoose";
import { StatusEmployee } from "./employee.type";

export const createEmployeeSchema = Joi.object({
  userId: Joi.string().custom((value, helpers) => {
    if (!Types.ObjectId.isValid(value)) return helpers.error("any.invalid");
    return value;
  }),
  phone: Joi.string().min(11).required(),
  address: Joi.string().min(5).required(),
  position: Joi.string().min(2).required(),
  department: Joi.string().custom((value, helpers) => {
    if (!Types.ObjectId.isValid(value)) return helpers.error("any.invalid");
    return value;
  }),
  salary: Joi.number().min(0).required(),
  status: Joi.string().valid(...Object.values(StatusEmployee)),
  nationalId: Joi.string().min(10).required(),
});

export const updateEmployeeSchema = Joi.object({
  phone: Joi.string().min(11).optional(),
  address: Joi.string().min(5).optional(),
  position: Joi.string().min(2).optional(),
  department: Joi.string().custom((value, helpers) => {
    if (!Types.ObjectId.isValid(value)) return helpers.error("any.invalid");
    return value;
  }),
  salary: Joi.number().min(0).optional(),
  status: Joi.string()
    .valid(...Object.values(StatusEmployee))
    .optional(),
  nationalId: Joi.string().min(10).optional(),
});
