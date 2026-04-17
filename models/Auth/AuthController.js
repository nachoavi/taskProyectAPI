import { AuthService } from "../Auth/AuthService.js";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

const SECRET = process.env.JWT_SECRET;

export class AuthController {
  static registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    const newUser = {
      username,
      email,
      password,
    };
    const user = await AuthService.registerUser(newUser);
    if (!user) {
      return res.status(400).json({ message: "User registration failed" });
    }
    return res
      .status(201)
      .json({ user }, { message: "User registered successfully" });
  };

  static loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = { email, password };
    const loginUser = await AuthService.loginUser(user);
    if (!loginUser) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: loginUser.id, role: loginUser.role }, SECRET, {
      expiresIn: "1h",
    });
    return res.status(200).json({
      message: "Login succesfully",
      user: { id: loginUser.id, role: loginUser.role },
      token: token,
    });
  };
}
