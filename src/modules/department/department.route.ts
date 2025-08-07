import { Router } from "express";
import DepartmentController from "./department.controller";
import auth from "../../middlewares/authentication";
import authorizationRoles from "../../middlewares/authorization";
import { AppRoles } from "../auth/auth.roles";
import expressAsyncHandler from "express-async-handler";

class DepartmentRoutes {
  public router = Router();
  private controller = new DepartmentController();

  constructor() {
    this.initRoutes();
  }

  private initRoutes = () => {
    this.router.post(
      "/",
      auth,
      authorizationRoles(AppRoles.ADMIN),
      expressAsyncHandler(this.controller.create)
    );

    this.router.get(
      "/",
      auth,
      authorizationRoles(AppRoles.ADMIN, AppRoles.MANAGER),
      expressAsyncHandler(this.controller.getAll)
    );

    this.router.get(
      "/:id",
      auth,
      authorizationRoles(AppRoles.ADMIN, AppRoles.MANAGER),
      expressAsyncHandler(this.controller.getOne)
    );

    this.router.put(
      "/:id",
      auth,
      authorizationRoles(AppRoles.ADMIN, AppRoles.MANAGER),
      expressAsyncHandler(this.controller.update)
    );

    this.router.delete(
      "/:id",
      auth,
      authorizationRoles(AppRoles.ADMIN, AppRoles.MANAGER),
      expressAsyncHandler(this.controller.delete)
    );
  };
}

export default DepartmentRoutes;
