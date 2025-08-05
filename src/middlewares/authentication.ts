import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import { StatusCode } from "../utils/statusCode";
import jwt from "jsonwebtoken";
import { JWTPayload } from "../utils/jwtPayload";
import User from "../modules/auth/user.model";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { accessToken } = req.cookies;

    if (!accessToken)
      throw new AppError("No Token Provided", StatusCode.UNAUTHORIZED);

    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET!);

    if (typeof decoded === "string")
      throw new AppError("Invalid token payload", StatusCode.UNAUTHORIZED);

    const payload = decoded as JWTPayload;

    const user = await User.findById(payload.id);
    if (!user) throw new AppError("User not found", StatusCode.BAD_REQUEST);

    (req as any).user = payload;

    next();
  } catch (err) {
    if (err instanceof AppError)
      next(new AppError(err.message, StatusCode.UNAUTHORIZED));
    else throw new AppError("Expire or invalid token", StatusCode.UNAUTHORIZED);
  }
};

export default auth;
