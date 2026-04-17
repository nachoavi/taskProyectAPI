import { TaskService } from "./TaskService.js";

export class TaskController {
  static createTask = async (req, res) => {
    const userId = req.user.id;
    const { title, description } = req.body;
    const task = await TaskService.createTask({ title, description, userId });
    if (!task) {
      return res.status(500).json({ error: "Failed to create task" });
    }
    return res.status(201).json(task);
  };

  static getTasks = async (req, res) => {
    const userId = req.user.id;
    const tasks = await TaskService.getAllTask(userId);
    if (!tasks) {
      return res.status(500).json({ error: "Failed to get tasks" });
    }
    return res.status(200).json(tasks);
  };
}
