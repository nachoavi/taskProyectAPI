import { Router } from "express";
import { AuthController } from "./AuthController.js";
import { AuthMiddleware } from "../../shared/middlewares/authMiddleware.js";
import { ValidationsMiddleware } from "../../shared/middlewares/validationsMiddleware.js";

const authRouter = Router();

authRouter.post(
  "/register",
  ValidationsMiddleware.validateCreateUser,
  AuthController.registerUser,
);
authRouter.post(
  "/login",
  ValidationsMiddleware.validateCreateUser,
  AuthController.loginUser,
);

export default authRouter;
