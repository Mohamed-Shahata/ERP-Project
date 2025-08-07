import { ObjectId } from "mongoose";

export interface IEmployee {
  userId: ObjectId;
  phone: string;
  address: string;
  position: string;
  department: ObjectId;
  hireDate: Date;
  salary: number;
  status: string;
  nationalId: string;
}

export interface UpdateEmployeeDto extends IEmployee {}

export interface CreateEmployeeDto extends IEmployee {}

export enum StatusEmployee {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export interface EmployeeMessage {
  message: string;
}
