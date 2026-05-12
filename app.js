import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./models/Auth/AuthRouter.js";
import taskRouter from "./models/Task/TaskRouter.js";
import { adminUserRouter } from "./models/AdminUsers/userRouter.js";

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);
app.use("/tasks", taskRouter);
app.use("/users", adminUserRouter);
app.get("/health", (req, res) => {
  res.send("OK");
});

if (process.env.NODE !== "production") {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

export default app;
