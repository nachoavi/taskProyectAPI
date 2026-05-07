import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class TaskService {
  static createTask = async ({ title, description, userId }) => {
    const task = await prisma.task.create({
      data: {
        title,
        description,
        userId,
      },
    });
    if (!task) {
      throw new Error("Failed to create task");
    }
    return task;
  };

  static getAllTaskByAdmin = async () => {
    const tasks = await prisma.task.findMany({
      include: {
        user: true,
      },
    });
    if (!tasks) {
      throw new Error("Failed to get tasks");
    }
    return tasks;
  };

  static getAllTask = async ({ userId, completed }) => {
    const filter = {
      userId,
    };
    if (completed !== undefined) {
      filter.completed = completed === "true";
    }
    const tasks = await prisma.task.findMany({
      where: filter,
    });
    if (!tasks) {
      throw new Error("Failed to get tasks");
    }
    return tasks;
  };
  static getTaskById = async (TaskId, userId) => {
    const task = await prisma.task.findUnique({
      where: {
        id: Number(TaskId),
        userId,
      },
    });
    if (!task) {
      throw new Error("Failed to get task");
    }
    return task;
  };

  static updateTask = async (id, { title, description }) => {
    const task = await prisma.task.update({
      where: {
        id,
      },
      data: {
        title,
        description,
      },
    });
    if (!task) {
      throw new Error("Failed to update task");
    }
    return task;
  };

  static completeTask = async (id) => {
    const task = await prisma.task.update({
      where: {
        id: Number(id),
      },
      data: {
        completed: true,
      },
    });
    if (!task) {
      throw new Error("Failed to complete task");
    }
    return task;
  };

  static deleteTask = async (id) => {
    const task = await prisma.task.delete({
      where: {
        id: Number(id),
      },
    });
    if (!task) {
      throw new Error("Failed to delete task");
    }
    return task;
  };
}
