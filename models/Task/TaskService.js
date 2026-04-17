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
  static getAllTask = async (id) => {
    const tasks = await prisma.task.findMany({
      where: {
        userId: id,
      },
    });
    if (!tasks) {
      throw new Error("Failed to get tasks");
    }
    return tasks;
  };
  static getTaskById = async (id) => {
    const task = await prisma.task.findUnique({
      where: {
        id,
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
  static deleteTask = async (id) => {
    const task = await prisma.task.delete({
      where: {
        id,
      },
    });
    if (!task) {
      throw new Error("Failed to delete task");
    }
    return task;
  };
}
