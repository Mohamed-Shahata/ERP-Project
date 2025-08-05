import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import connectionDB from "./config/connectionDB";
import errorHandler from "./middlewares/errorHandler";
import AuthRoutes from "./modules/auth/auth.route";

config();

const app = express();
const authRoutes = new AuthRoutes();

// connection DB
connectionDB();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1/auth", authRoutes.router);

// Error Handler
app.use(errorHandler);

export default app;
