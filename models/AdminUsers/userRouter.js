import { Router } from "express";
import { UserController } from "./userController.js";
import { AuthMiddleware } from "../../shared/middlewares/authMiddleware.js";

const adminUserRouter = Router();

adminUserRouter.get(
  "/",
  AuthMiddleware.validateToken,
  AuthMiddleware.isAdmin,
  UserController.getAllUser,
);
adminUserRouter.get(
  "/:id",
  AuthMiddleware.validateToken,
  AuthMiddleware.isAdmin,
  UserController.getUserById,
);
adminUserRouter.delete(
  "/:id",
  AuthMiddleware.validateToken,
  AuthMiddleware.isAdmin,
  UserController.deleteUser,
);

export { adminUserRouter };
