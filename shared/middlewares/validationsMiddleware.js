import { validateCreateUser } from "../schemas/userSchema.js";
import { validateCreateTask } from "../schemas/taskSchema.js";

export class ValidationsMiddleware {
  static validateCreateUser = (req, res, next) => {
    const result = validateCreateUser(req.body);
    if (result.success) {
      req.body = result.data;
      return next();
    }
    return res
      .status(400)
      .json({ message: "Invalid user data", details: result.error });
  };

  static validateCreateTask = (req, res, next) => {
    const result = validateCreateTask(req.body);
    if (result.success) {
      req.body = result.data;
      return next();
    }
    return res
      .status(400)
      .json({ message: "Invalid task data", details: result.error });
  };
}
