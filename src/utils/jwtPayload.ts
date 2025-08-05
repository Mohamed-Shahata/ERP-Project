import { Schema } from "mongoose";
import { AppRoles } from "../modules/auth/auth.types";

export interface JWTPayload {
  id: Schema.Types.ObjectId;
  role: AppRoles;
  iat?: number;
  exp?: number;
}
