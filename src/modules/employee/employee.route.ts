import { Router } from "express";
import EmployeeController from "./employee.controller";
import auth from "../../middlewares/authentication";
import authorizationRoles from "../../middlewares/authorization";
import { AppRoles } from "../auth/auth.roles";
import expressAsyncHandler from "express-async-handler";

class EmployeeRoutes {
  public router = Router();
  private controller = new EmployeeController();

  constructor() {
    this.initRoutes();
  }

  private initRoutes = () => {
    this.router.get(
      "/:id",
      auth,
      authorizationRoles(AppRoles.ADMIN, AppRoles.MANAGER),
      expressAsyncHandler(this.controller.getOne)
    );

    this.router.get(
      "/",
      auth,
      authorizationRoles(AppRoles.ADMIN, AppRoles.MANAGER),
      expressAsyncHandler(this.controller.getAll)
    );

    this.router.post(
      "/",
      auth,
      authorizationRoles(AppRoles.ADMIN),
      expressAsyncHandler(this.controller.create)
    );

    this.router.put(
      "/:id",
      auth,
      authorizationRoles(AppRoles.ADMIN),
      expressAsyncHandler(this.controller.update)
    );

    this.router.delete(
      "/:id",
      auth,
      authorizationRoles(AppRoles.ADMIN),
      expressAsyncHandler(this.controller.delete)
    );
  };
}

export default EmployeeRoutes;
