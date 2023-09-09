const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT;

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

const userRouter = require("./infra/http/routes/user");

const equipmentRouter = require("./infra/http/routes/equipment");

app.use("/user", userRouter);
app.use("/equipment", equipmentRouter);

app.listen(port, () => {
  console.log("[Server]: EquipHub Server started!");
  console.log(`[Server]: I am running at http://localhost:${port}`);
});
