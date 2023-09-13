const PrismaInstance = require('../../../../shared/infra/prisma.js');
const PrismaDummyRepo = require('../../repositories/prismaDummyRepo.js');
const GetDummyByName = require('./getDummyByName');
const GetDummyByNameController = require('./getDummyByNameController.js');

const prismaDummyRepo = new PrismaDummyRepo(PrismaInstance);

const getDummyByName = new GetDummyByName(prismaDummyRepo);

const getDummyByNameController = new GetDummyByNameController(getDummyByName);

module.exports = getDummyByNameController;
