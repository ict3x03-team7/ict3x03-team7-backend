import express from "express";
const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  res.json({ message: "You are a user" });
});

export default userRouter;
