import express from "express";
const equipmentRouter = express.Router();

equipmentRouter.get("/", async (req, res) => {
  res.json({ message: "You are a equipment" });
});

export default equipmentRouter;
