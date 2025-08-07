import { Request, Response } from "express";
import DepartmentService from "./department.service";
import {
  createDepartmentSchema,
  updateDepartmentSchema,
} from "./department.validation";
import AppError from "../../utils/appError";
import { VALIDATION_FAILED } from "../../utils/constant";
import { StatusCode } from "../../utils/statusCode";
import { CreateDepartmentDto, UpdateDepartmentDto } from "./department.type";
import sendResponse from "../../utils/sendResponse";

class DepartmentController {
  private departmentService: DepartmentService;

  constructor() {
    this.departmentService = new DepartmentService();
  }

  // POST - ~/departments/
  public create = async (req: Request, res: Response) => {
    const { name, description, manager } = req.body;

    const { error, value } = createDepartmentSchema.validate({
      name,
      description,
      manager,
    });

    if (error)
      throw new AppError(
        VALIDATION_FAILED,
        StatusCode.BAD_REQUEST,
        error.details
      );

    const dto: CreateDepartmentDto = value;
    const department = await this.departmentService.create(dto);

    sendResponse(
      res,
      "Create department successful",
      StatusCode.CREATED,
      true,
      department
    );
  };

  // GET - ~/departments/
  public getAll = async (req: Request, res: Response) => {
    const departments = await this.departmentService.getAll();

    sendResponse(res, null, StatusCode.OK, true, departments);
  };

  // GET - ~/departments/:id
  public getOne = async (req: Request, res: Response) => {
    const { id } = req.params;

    const department = await this.departmentService.getOne(id);

    sendResponse(res, null, StatusCode.OK, true, department);
  };

  // PUT - ~/departments/:id
  public update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description, manager } = req.body;

    const { error, value } = updateDepartmentSchema.validate({
      name,
      description,
      manager,
    });

    if (error)
      throw new AppError(
        VALIDATION_FAILED,
        StatusCode.BAD_REQUEST,
        error.details
      );

    const dto: UpdateDepartmentDto = value;
    const department = await this.departmentService.update(id, dto);

    sendResponse(
      res,
      "Updated department successful",
      StatusCode.OK,
      true,
      department
    );
  };

  // DELETE - ~/departments/:id
  public delete = async (req: Request, res: Response) => {
    const { id } = req.params;

    const { message } = await this.departmentService.delete(id);

    sendResponse(res, message, StatusCode.OK, true);
  };
}
export default DepartmentController;
