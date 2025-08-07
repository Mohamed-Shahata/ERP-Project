import { Schema, model, Types } from "mongoose";
import { IEmployee, StatusEmployee } from "./employee.type";

const employeeSchema = new Schema<IEmployee>(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    phone: {
      type: String,
      min: 11,
      required: true,
    },
    address: {
      type: String,
      min: 5,
      required: true,
    },
    position: {
      type: String,
      min: 2,
      required: true,
    },
    department: {
      type: Types.ObjectId,
      ref: "Department",
      required: true,
    },
    salary: {
      type: Number,
      min: 0,
      required: true,
    },
    status: {
      type: String,
      enum: StatusEmployee,
      default: StatusEmployee.ACTIVE,
    },
    hireDate: {
      type: Date,
      default: new Date(),
    },
    nationalId: {
      type: String,
      min: 10,
      required: true,
    },
  },
  { timestamps: true }
);

const Employee = model<IEmployee>("Employee", employeeSchema);
export default Employee;
