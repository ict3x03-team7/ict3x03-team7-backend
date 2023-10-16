const PrismaInstance = require('../../../../shared/infra/prisma.js');
const PrismaUserRepo = require('./../../repositories/prismaUserRepo.js');
const UnlockUser = require('./unlockUser.js');
const UnlockUserController = require('./unlockUserController.js');
const redisClient = require('./../../../session/redis.js');

const prismaUserRepo = new PrismaUserRepo(PrismaInstance);

const unlockUser = new UnlockUser(prismaUserRepo, redisClient);

const unlockUserController = new UnlockUserController(unlockUser);

module.exports = unlockUserController;
