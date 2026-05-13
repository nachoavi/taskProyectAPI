import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import rateLimit from "express-rate-limit";
import authRouter from "./models/Auth/AuthRouter.js";
import taskRouter from "./models/Task/TaskRouter.js";
import { adminUserRouter } from "./models/AdminUsers/userRouter.js";

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: "draft-7", // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use("/auth", authRouter);
app.use("/tasks", taskRouter);
app.use("/users", adminUserRouter);
app.get("/health", (req, res) => {
  res.send("OK");
});
app.use(limiter);

if (process.env.NODE !== "production") {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

export default app;
