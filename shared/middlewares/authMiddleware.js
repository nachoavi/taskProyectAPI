import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SECRET = process.env.JWT_SECRET;

export class AuthMiddleware {
  static validateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
  }

  static isAdmin(req, res, next) {
    const isAdmin = req.user.role === "admin";
    if (isAdmin) {
      next();
    } else {
      return res.status(403).json({
        message: "Access denied only admins can access this resource",
      });
    }
  }
}
