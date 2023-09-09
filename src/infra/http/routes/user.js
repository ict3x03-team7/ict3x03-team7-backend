const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.json({ message: "You are a user" });
});

module.exports = router;
