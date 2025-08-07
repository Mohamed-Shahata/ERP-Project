import { Schema, Types, model } from "mongoose";
import { IDepartment } from "./department.type";

const departmentSchema = new Schema<IDepartment>(
  {
    name: {
      type: String,
      min: 2,
      max: 100,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      min: 100,
      max: 5000,
      required: true,
    },
    manager: {
      type: Types.ObjectId,
      ref: "Employee",
      default: null,
    },
  },
  { timestamps: true }
);

const Department = model<IDepartment>("Department", departmentSchema);
export default Department;
