import express, { Request, Response } from "express";
import cors from "cors";

import userRoutes from "./routes/user.routes";
import chatRoutes from "./routes/chat.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/chat", chatRoutes);

app.get("/", (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Chat Backend API is running"
  });
});

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

export default app;
