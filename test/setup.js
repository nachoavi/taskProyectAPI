import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import app from "../app.js";

export const prisma = new PrismaClient();
let server;

beforeAll(async () => {
  await prisma.task.deleteMany({});
  await prisma.user.deleteMany({});

  const hashedPassword = await bcrypt.hash("Admin1234!", 10);
  await prisma.user.create({
    data: {
      username: "adminuser",
      email: "admin@example.com",
      password: hashedPassword,
      role: "admin",
    },
  });

  return new Promise((resolve) => {
    server = app.listen(0, () => {
      app.locals.server = server;
      resolve();
    });
  });
}, 60000);

afterAll(async () => {
  if (server) {
    server.close();
  }
  await prisma.$disconnect();
}, 60000);