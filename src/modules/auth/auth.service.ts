import AppError from "../../utils/appError";
import { StatusCode } from "../../utils/statusCode";
import { AuthMessage, AuthPayload, LoginDto, RegisterDto } from "./auth.types";
import User from "./user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class AuthService {
  /**
   * Create new user
   * @param dto user DTO { name, email, password }
   */
  public register = async (dto: RegisterDto): Promise<AuthMessage> => {
    const { name, email, password } = dto;

    const isEmailExsits = await User.findOne({ email });

    if (isEmailExsits)
      throw new AppError("Account already exsits", StatusCode.BAD_REQUEST);

    const newUser = await User.create({ name, email, password });
    newUser.save();

    return {
      message:
        "we sent verification code to your email please check your email",
    };
  };

  /**
   * login
   * @param dto user DTO { email, password }
   * @returns user data and access token
   */
  public login = async (dto: LoginDto): Promise<AuthPayload> => {
    const { email, password } = dto;

    const isEmailExsits = await User.findOne({ email });

    if (!isEmailExsits)
      throw new AppError("Email or password is wrong", StatusCode.BAD_REQUEST);

    const isMatch = await bcrypt.compare(password, isEmailExsits.password);

    if (!isMatch)
      throw new AppError("Email or password is wrong", StatusCode.BAD_REQUEST);

    const user = isEmailExsits;

    const accessToken = this.generateAccessToken(user._id, user.role);

    return { accessToken };
  };

  /**
   * Generate access token
   * @param id user id
   * @param role user role
   * @returns a accesstoken
   */
  private generateAccessToken = (id: any, role: any): string => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET!, { expiresIn: "1d" });
  };
}

export default AuthService;
