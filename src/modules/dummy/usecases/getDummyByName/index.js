import { PrismaInstance } from "../../../../shared/infra/prisma.js";
import PrismaDummyRepo from "../../repositories/prismaDummyRepo.js";
import { GetDummyByName } from "./getDummyByName.js";
import { GetDummyByNameController } from "./getDummyByNameController.js";

const prismaDummyRepo = new PrismaDummyRepo(PrismaInstance);

const getDummyByName = new GetDummyByName(prismaDummyRepo);

const getDummyByNameController = new GetDummyByNameController(getDummyByName);

export default getDummyByNameController;
