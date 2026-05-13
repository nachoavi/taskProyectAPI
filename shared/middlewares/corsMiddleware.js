import cors from "cors";

const allowedOrigins = [
  "https://task-project-front-psi.vercel.app",
  "https://task-project-front-git-main-nachoavis-projects.vercel.app",
  "https://task-project-front-pxcvj4gya-nachoavis-projects.vercel.app/",
];

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
});
