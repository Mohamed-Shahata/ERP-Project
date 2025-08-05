import { Request, Response } from "express";
import { loginSchema, registerSchema } from "./auth.validation";
import AppError from "../../utils/appError";
import { StatusCode } from "../../utils/statusCode";
import AuthService from "./auth.service";
import { LoginDto, RegisterDto } from "./auth.types";
import sendResponse from "../../utils/sendResponse";
import {
  ACCESS_TOKEN,
  PRODUCTION,
  VALIDATION_FAILED,
} from "../../utils/constant";

class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  // POST - /api/v1/auth/register
  public register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    // validation data
    const { error, value } = registerSchema.validate(
      { name, email, password },
      { abortEarly: false }
    );
    if (error)
      throw new AppError(
        VALIDATION_FAILED,
        StatusCode.BAD_REQUEST,
        error.details
      );

    const userDto: RegisterDto = value;
    const { message } = await this.authService.register(userDto);

    sendResponse(res, message, StatusCode.CREATED, true);
  };

  // POST - /api/v1/auth/login
  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // validation data
    const { error, value } = loginSchema.validate(
      { email, password },
      { abortEarly: false }
    );
    if (error)
      throw new AppError(
        VALIDATION_FAILED,
        StatusCode.BAD_REQUEST,
        error.details
      );

    const userDto: LoginDto = value;
    const { accessToken } = await this.authService.login(userDto);

    // set access token in cookie
    res.cookie(ACCESS_TOKEN, accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === PRODUCTION ? true : false,
      maxAge: this.getCookieExpiryInMs(1),
    });

    sendResponse(res, "Login successful", StatusCode.OK, true);
  };

  // POST - /api/v1/auth/logout
  public logout = async (req: Request, res: Response) => {
    const { accessToken } = req.cookies;

    if (!accessToken)
      throw new AppError("Already logout", StatusCode.BAD_REQUEST);

    // clear access token from cookies
    res.clearCookie(ACCESS_TOKEN);

    sendResponse(res, "Logout successful", StatusCode.OK, true);
  };

  /**
   * Converts days into milliseconds (for cookie expiration).
   * @param days Number of days
   * @returns Equivalent time in milliseconds
   */
  private getCookieExpiryInMs = (days: number): number => {
    return days * 24 * 60 * 60 * 1000;
  };
}

export default AuthController;
