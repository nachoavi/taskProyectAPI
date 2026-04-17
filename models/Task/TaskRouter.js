import { Router } from "express";
import { AuthMiddleware } from "../../shared/middlewares/authMiddleware.js";
import { TaskController } from "./TaskController.js";

const Taskrouter = Router();

Taskrouter.post("/", AuthMiddleware.validateToken, TaskController.createTask);
Taskrouter.get("/", AuthMiddleware.validateToken, TaskController.getTasks);

export default Taskrouter;
