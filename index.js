const express = require("express");
const app = express();
const cors = require("cors");

app.listen(8095);

app.use(
  cors({
    origin: "*",
  })
);

const userRouter = require("./routes/user");

const equipmentRouter = require("./routes/equipment");

app.use("/user", userRouter);
app.use("/equipment", equipmentRouter);
