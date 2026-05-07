import prisma from "@prisma/client";

const db = new prisma.PrismaClient();

export class UserService {
  static getAllUser = async () => {
    const users = await db.user.findMany();
    if (!users) {
      throw new Error("Failed to fetch users");
    }
    return users;
  };

  static getUserById = async (id) => {
    const user = await db.user.findUnique({ where: { id: Number(id) } });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  };

  static deleteUser = async (id) => {
    await db.user.delete({ where: { id: Number(id) } });
  };
}
