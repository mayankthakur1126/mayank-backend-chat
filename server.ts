
import dotenv from "dotenv";
import app from "./app";
import sequelize from "./config/db";

dotenv.config();

const PORT = Number(process.env.PORT || 5000);

async function startServer(): Promise<void> {
  try {
    await sequelize.authenticate();

    console.log("MySQL connected successfully");

    await sequelize.sync();

    console.log("Database synchronized successfully");

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("Server startup failed:", error);
  }
}

startServer();
