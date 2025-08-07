import { ObjectId } from "mongoose";

export interface IDepartment {
  name: string;
  description: string;
  manager?: ObjectId | null;
}

export interface DepartmentMessage {
  message: string;
}

export interface CreateDepartmentDto extends IDepartment {}

export interface UpdateDepartmentDto extends IDepartment {}
