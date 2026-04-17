import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();
export class AuthService {
  static registerUser = async ({ username, email, password }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  };

  static loginUser = async ({ email, password }) => {
    const user = await db.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  };
}
