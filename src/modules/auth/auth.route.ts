import { Router } from "express";
import AuthController from "./auth.controller";
import auth from "../../middlewares/authentication";
import expressAsyncHandler from "express-async-handler";

class AuthRoutes {
  public router = Router();
  private controller = new AuthController();

  constructor() {
    this.initRoutes();
  }

  /**
   * @method initRoutes
   * @private
   * Defines all authentication routes and attaches corresponding middleware and controller methods.
   *
   * - POST `/register` → Register a new user
   * - POST `/login` → Login user and return token
   * - POST `/logout` → Logout user (protected route)
   */
  private initRoutes = () => {
    this.router.post(
      "/register",
      expressAsyncHandler(this.controller.register)
    );

    this.router.post("/login", expressAsyncHandler(this.controller.login));

    this.router.post(
      "/logout",
      auth,
      expressAsyncHandler(this.controller.logout)
    );
  };
}
export default AuthRoutes;
