import { Router } from "express";
import { AuthController } from "./AuthController.js";
import { AuthMiddleware } from "../../shared/middlewares/authMiddleware.js";

const authRouter = Router();

authRouter.post(
  "/register",
  AuthMiddleware.validateRegister,
  AuthController.registerUser,
);
authRouter.post(
  "/login",
  AuthMiddleware.validateLogin,
  AuthController.loginUser,
);

export default authRouter;
