const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const equipmentRouter = require("./infra/http/routes/equipment");
const userRouter = require("./infra/http/routes/user");
const dummyRouter = require("./infra/http/routes/dummy");
const morgan = require("morgan");
const helmet = require("helmet");

const app = express();
dotenv.config();
const port = process.env.PORT;

app.use(
  cors({
    origin: "http://127.0.0.1",
  })
);

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use("/user", userRouter);
app.use("/equipment", equipmentRouter);
app.use("/dummy", dummyRouter);

module.exports = app;