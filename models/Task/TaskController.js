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

  static createTaskByAdmin = async (req, res) => {
    const { title, description, userId, dueDate } = req.body;
    const task = await TaskService.createTask({
      title,
      description,
      userId,
      dueDate,
    });
    if (!task) {
      return res.status(500).json({ error: "Failed to create task" });
    }
    return res.status(201).json(task);
  };

  static getTasks = async (req, res) => {
    const userId = req.user.id;
    const { completed } = req.query;

    try {
      const tasks = await TaskService.getAllTask({ userId, completed });
      return res.status(200).json(tasks);
    } catch (error) {
      return res.status(500).json({ error: "Failed to get tasks" });
    }
  };

  static getAllTaskByAdmin = async (req, res) => {
    try {
      const task = await TaskService.getAllTaskByAdmin();
      return res.status(200).json(task);
    } catch (error) {
      return res.status(500).json({ error: "Failed to get tasks" });
    }
  };

  static getTaskById = async (req, res) => {
    const taskId = req.params.id;
    const userId = req.user.id;
    const task = await TaskService.getTaskById(taskId, userId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    return res.status(200).json(task);
  };

  static completeTask = async (req, res) => {
    const taskId = req.params.id;
    const task = await TaskService.completeTask(taskId);
    if (!task) {
      return res.status(500).json({ error: "Failed to complete task" });
    }
    return res.status(200).json(task);
  };

  static deleteTask = async (req, res) => {
    const taskId = req.params.id;
    const task = await TaskService.deleteTask(taskId);
    if (!task) {
      return res.status(500).json({ error: "Failed to delete task" });
    }
    return res.status(200).json(task);
  };
}
