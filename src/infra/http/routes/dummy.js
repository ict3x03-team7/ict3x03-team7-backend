import { PrismaClient } from "@prisma/client";
import PrismaDummyRepo from "../../../modules/dummy/repositories/prismaDummyRepo.js";
import express from "express";
import getDummyByNameController from "../../../modules/dummy/usecases/getDummyByName/index.js";
const dummyRouter = express.Router();

dummyRouter.get("/:name", async (req, res) => {
  getDummyByNameController.execute(req, res);
});

export default dummyRouter;
