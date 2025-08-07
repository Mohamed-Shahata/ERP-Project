import { Schema, model } from "mongoose";
import { IUser, UserGender } from "./auth.types";
import bcrypt from "bcryptjs";
import { AppRoles } from "./auth.roles";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      min: 5,
      max: 20,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      min: 8,
      max: 50,
      required: true,
    },
    gender: {
      type: String,
      enum: UserGender,
      default: UserGender.MALE,
    },
    image: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: AppRoles,
      default: AppRoles.VIEWER,
    },
  },
  { timestamps: true }
);

// Hashing password before saveing the user
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) return next();

  const salt = await bcrypt.genSalt(+process.env.SALT!);
  const hashPassword = await bcrypt.hash(user.password, salt);

  user.password = hashPassword;

  next();
});

const User = model<IUser>("User", userSchema);
export default User;
