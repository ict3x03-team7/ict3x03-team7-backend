const PrismaInstance = require('../../../../shared/infra/prisma.js');
const PrismaUserRepo = require('./../../repositories/prismaUserRepo.js');
const DeleteUser = require('./deleteUser.js');
const DeleteUserController = require('./deleteUserController.js');

const prismaUserRepo = new PrismaUserRepo(PrismaInstance);

const deleteUser = new DeleteUser(prismaUserRepo);

const deleteUserController = new DeleteUserController(deleteUser);

module.exports = deleteUserController;
