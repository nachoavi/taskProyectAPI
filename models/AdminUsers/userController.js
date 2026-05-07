import { UserService } from "./userService.js";
export class UserController {
  static getAllUser = async (req, res) => {
    try {
      const users = await UserService.getAllUser();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static getUserById = async (req, res) => {
    try {
      const user = await UserService.getUserById(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };

  static deleteUser = async (req, res) => {
    try {
      await UserService.deleteUser(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}
