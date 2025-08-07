import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import connectionDB from "./config/connectionDB";
import errorHandler from "./middlewares/errorHandler";
import AuthRoutes from "./modules/auth/auth.route";
import DepartmentRoutes from "./modules/department/department.route";
import EmployeeRoutes from "./modules/employee/employee.route";

config();

const app = express();

//
const authRoutes = new AuthRoutes();
const departmentRoutes = new DepartmentRoutes();
const employeeRoutes = new EmployeeRoutes();

// connection DB
connectionDB();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1/auth", authRoutes.router);
app.use("/api/v1/departments", departmentRoutes.router);
app.use("/api/v1/employees", employeeRoutes.router);

// Error Handler
app.use(errorHandler);

export default app;
