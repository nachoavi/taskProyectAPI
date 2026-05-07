import { Router } from "express";
import { AuthMiddleware } from "../../shared/middlewares/authMiddleware.js";
import { TaskController } from "./TaskController.js";

const Taskrouter = Router();

Taskrouter.post("/", AuthMiddleware.validateToken, TaskController.createTask);
Taskrouter.post(
  "/admin",
  AuthMiddleware.validateToken,
  AuthMiddleware.isAdmin,
  TaskController.createTaskByAdmin,
);
Taskrouter.get("/", AuthMiddleware.validateToken, TaskController.getTasks);
Taskrouter.get(
  "/admin",
  AuthMiddleware.validateToken,
  AuthMiddleware.isAdmin,
  TaskController.getAllTaskByAdmin,
);
Taskrouter.get(
  "/:id",
  AuthMiddleware.validateToken,
  TaskController.getTaskById,
);
Taskrouter.put(
  "/complete/:id",
  AuthMiddleware.validateToken,
  TaskController.completeTask,
);
Taskrouter.delete(
  "/:id",
  AuthMiddleware.validateToken,
  TaskController.deleteTask,
);

export default Taskrouter;
