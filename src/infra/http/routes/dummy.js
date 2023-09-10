const express = require("express");
const getDummyByNameController = require("../../../modules/dummy/usecases/getDummyByName/index.js");

const dummyRouter = express.Router();

dummyRouter.get("/:name", async (req, res) => {
  getDummyByNameController.execute(req, res);
});

module.exports = dummyRouter;
