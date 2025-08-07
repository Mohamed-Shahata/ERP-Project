import { Types } from "mongoose";
import AppError from "../../utils/appError";
import { StatusCode } from "../../utils/statusCode";
import { AppRoles } from "../auth/auth.roles";
import User from "../auth/user.model";
import Employee from "./employee.model";
import {
  CreateEmployeeDto,
  EmployeeMessage,
  IEmployee,
  UpdateEmployeeDto,
} from "./employee.type";

class EmployeeService {
  /**
   * Get all employees from database
   * @returns array from employee
   */
  public getAll = async (): Promise<Array<IEmployee>> => {
    const employees = await Employee.find().populate([
      {
        path: "userId",
        select: "name email image gender role",
      },
      {
        path: "department",
        select: "name manager",
      },
    ]);

    return employees;
  };

  /**
   *  Get one employee from id
   * @param id id employee
   * @returns employee data
   */
  public getOne = async (id: string) => {
    const employee = await Employee.findById(id).populate([
      {
        path: "userId",
        select: "name email image gender role",
      },
      {
        path: "department",
        select: "name manager",
      },
    ]);
    if (!employee)
      throw new AppError("Employee not found", StatusCode.NOT_FOUND);

    return employee;
  };

  /**
   *  Create new Employee
   * @param dto
   * @returns a employee
   */
  public create = async (dto: CreateEmployeeDto): Promise<IEmployee> => {
    const isUserExsits = await User.findById(dto.userId);
    if (!isUserExsits)
      throw new AppError("User not found", StatusCode.BAD_REQUEST);

    const employee = Employee.create(dto);

    isUserExsits.role = AppRoles.EMPLOYEE;
    await isUserExsits.save();

    return employee;
  };

  /**
   * Update employee data
   * @param id id employee
   * @returns a employee data after edit
   */
  public update = async (
    id: string,
    dto: UpdateEmployeeDto
  ): Promise<IEmployee> => {
    const { address, department, nationalId, phone, position, salary, status } =
      dto;
    const employee = await this.getOne(id);

    const user = await User.findById(employee.userId);
    if (!user) throw new AppError("User not found", StatusCode.NOT_FOUND);

    employee.address = address || employee.address;
    employee.department = department || employee.department;
    employee.nationalId = nationalId || employee.nationalId;
    employee.phone = phone || employee.phone;
    employee.position = position || employee.position;
    employee.salary = salary || employee.salary;
    employee.status = status || employee.status;
    employee.salary = salary || employee.salary;

    employee.save();

    return employee;
  };

  /**
   * Delete employe from database
   * @param id id employee
   * @returns message
   */
  public delete = async (id: string): Promise<EmployeeMessage> => {
    const employee = await this.getOne(id);

    const user = await User.findById(employee.userId);

    if (!user) throw new AppError("User not found", StatusCode.NOT_FOUND);

    user.role = AppRoles.VIEWER;
    await user.save();

    await employee.deleteOne();

    return { message: "Delete employee successful" };
  };
}

export default EmployeeService;
