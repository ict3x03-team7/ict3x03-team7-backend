const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const equipmentRouter = require("./infra/http/routes/equipment.js");
const userRouter = require("./infra/http/routes/user.js");
const dummyRouter = require("./infra/http/routes/dummy.js");
const morgan = require("morgan");

const app = express();
dotenv.config();
const port = process.env.PORT;

app.use(
  cors({
    origin: "*",
  })
);

app.use(morgan("dev"));
app.use(express.json());

app.use("/user", userRouter);
app.use("/equipment", equipmentRouter);
app.use("/dummy", dummyRouter);

app.listen(port, () => {
  console.log("[Server]: EquipHub Server started!");
  console.log(`[Server]: I am running at http://localhost:${port}`);
});
