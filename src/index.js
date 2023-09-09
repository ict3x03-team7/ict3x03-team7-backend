import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import equipmentRouter from "./infra/http/routes/equipment.js";
import userRouter from "./infra/http/routes/user.js";

const app = express();
dotenv.config();
const port = process.env.PORT;

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use("/user", userRouter);
app.use("/equipment", equipmentRouter);

app.listen(port, () => {
  console.log("[Server]: EquipHub Server started!");
  console.log(`[Server]: I am running at http://localhost:${port}`);
});
