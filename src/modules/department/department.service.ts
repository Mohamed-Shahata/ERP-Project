import AppError from "../../utils/appError";
import { StatusCode } from "../../utils/statusCode";
import Employee from "../employee/employee.model";
import Department from "./department.model";
import {
  CreateDepartmentDto,
  DepartmentMessage,
  IDepartment,
  UpdateDepartmentDto,
} from "./department.type";

class DepartmentService {
  /**
   * Create a new department
   * @param dto data of department after validation
   * @returns a new department from database
   */
  public create = async (dto: CreateDepartmentDto): Promise<IDepartment> => {
    const { name, description, manager } = dto;

    const isDepartmentExsits = await Department.findOne({ name });
    if (isDepartmentExsits)
      throw new AppError("Department already exsits", StatusCode.BAD_REQUEST);

    if (manager) {
      const isEmployee = await Employee.findById(manager);
      if (!isEmployee)
        throw new AppError("this not employee", StatusCode.BAD_REQUEST);
    }

    const department = Department.create({
      name,
      description,
      manager,
    });

    return department;
  };

  /**
   *  Get all department from database
   * @returns array of departments
   */
  public getAll = async (): Promise<Array<IDepartment>> => {
    const departments = await Department.find().populate({
      path: "manager",
      select: "phone position nationalId userId",
      populate: { path: "userId", select: "name email image" },
    });

    return departments;
  };

  /**
   * Get a one department at id from database
   * @param id id of department
   * @returns a department use this id from database
   */
  public getOne = async (id: string) => {
    const department = await Department.findById(id).populate({
      path: "manager",
      select: "phone position nationalId userId",
      populate: { path: "userId", select: "name email image" },
    });

    if (!department)
      throw new AppError("Department not found", StatusCode.NOT_FOUND);

    return department;
  };

  /**
   *  Update a department
   * @param id id of department
   * @param dto data of department after validation
   * @returns department after updated
   */
  public update = async (id: string, dto: UpdateDepartmentDto) => {
    const { name, description, manager } = dto;

    const department = await this.getOne(id);

    department.name = name || department.name;
    department.description = description || department.description;
    department.manager = manager || department.manager;

    await department.save();

    return department;
  };

  /**
   * Delete a department
   * @param id id of department
   * @returns a message success delete deoartment from database
   */
  public delete = async (id: string): Promise<DepartmentMessage> => {
    const department = await this.getOne(id);

    await department.deleteOne();

    return { message: "Delete department successful" };
  };
}
export default DepartmentService;
