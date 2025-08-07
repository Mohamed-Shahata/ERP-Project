import { NextFunction, Request, Response } from "express";
import { AppRoles } from "../modules/auth/auth.roles";
import AppError from "../utils/appError";
import { StatusCode } from "../utils/statusCode";

const authorizationRoles = (...roles: Array<AppRoles>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const role = (req as any).user.role;
    if (!roles.includes(role))
      throw new AppError("Forbidden resource", StatusCode.FORBIDDEN);

    next();
  };
};

export default authorizationRoles;
