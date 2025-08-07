import { Request, Response } from "express";
import EmployeeService from "./employee.service";
import {
  createEmployeeSchema,
  updateEmployeeSchema,
} from "./employee.validation";
import { VALIDATION_FAILED } from "../../utils/constant";
import { StatusCode } from "../../utils/statusCode";
import AppError from "../../utils/appError";
import { CreateEmployeeDto, UpdateEmployeeDto } from "./employee.type";
import sendResponse from "../../utils/sendResponse";

class EmployeeController {
  private employeeService: EmployeeService;

  constructor() {
    this.employeeService = new EmployeeService();
  }

  // GET - ~/employees
  public getAll = async (req: Request, res: Response) => {
    const employees = await this.employeeService.getAll();

    sendResponse(res, null, StatusCode.OK, true, employees);
  };

  // GET - ~/employees/:id
  public getOne = async (req: Request, res: Response) => {
    const { id } = req.params;

    const employee = await this.employeeService.getOne(id);

    sendResponse(res, null, StatusCode.OK, true, employee);
  };

  // POST - ~/employees
  public create = async (req: Request, res: Response) => {
    const { error, value } = createEmployeeSchema.validate(req.body);

    if (error)
      throw new AppError(
        VALIDATION_FAILED,
        StatusCode.BAD_REQUEST,
        error.details
      );

    const dto: CreateEmployeeDto = value;
    const employee = await this.employeeService.create(dto);

    sendResponse(
      res,
      "Created employee successful",
      StatusCode.CREATED,
      true,
      employee
    );
  };

  // PUT - ~/employees/:id
  public update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { error, value } = updateEmployeeSchema.validate(req.body);

    if (error)
      throw new AppError(
        VALIDATION_FAILED,
        StatusCode.BAD_REQUEST,
        error.details
      );

    const dto: UpdateEmployeeDto = value;
    const employee = await this.employeeService.update(id, dto);

    sendResponse(
      res,
      "Updated employee successful",
      StatusCode.OK,
      true,
      employee
    );
  };

  // DELETE - ~/employees/:id
  public delete = async (req: Request, res: Response) => {
    const { id } = req.params;

    const { message } = await this.employeeService.delete(id);

    sendResponse(res, message, StatusCode.OK, true);
  };
}

export default EmployeeController;
