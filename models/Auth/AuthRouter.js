import { Router } from "express";
import { AuthController } from "./AuthController.js";
import { ValidationsMiddleware } from "../../shared/middlewares/validationsMiddleware.js";

const authRouter = Router();

authRouter.post(
  "/register",
  ValidationsMiddleware.validateCreateUser,
  AuthController.registerUser,
);
authRouter.post(
  "/login",
  ValidationsMiddleware.validateLogin,
  AuthController.loginUser,
);

export default authRouter;
