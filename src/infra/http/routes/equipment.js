const express = require("express");
const equipmentRouter = express.Router();

equipmentRouter.get("/", async (req, res) => {
  res.json({ message: "You are a equipment" });
});
module.exports = equipmentRouter;
