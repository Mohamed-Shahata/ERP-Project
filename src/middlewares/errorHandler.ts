import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import sendResponse from "../utils/sendResponse";

const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err) {
    sendResponse(
      res,
      err.message || "Internal server error",
      err.status,
      false,
      null,
      err.errors
    );
  }
  next();
};

export default errorHandler;
