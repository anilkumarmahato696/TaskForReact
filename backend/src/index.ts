import express from "express";
import taskRoutes from "./routes/tasks";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/tasks", taskRoutes);

app.listen(3000, () => console.log("API running at http://localhost:3000"));
