const PrismaInstance = require('../../../../shared/infra/prisma.js');
const PrismaUserRepo = require('./../../repositories/prismaUserRepo.js');
const UpdatePassword = require('./updatePassword.js');
const UpdatePasswordController = require('./updatePasswordController.js');
const bcrypt = require('bcrypt');
const BcryptHashingService = require('./../../../../shared/services/bcryptHashingService.js');

const prismaUserRepo = new PrismaUserRepo(PrismaInstance);

const bcryptHashingService = new BcryptHashingService(bcrypt);

const updatePassword = new UpdatePassword(prismaUserRepo, bcryptHashingService);

const updatePasswordController = new UpdatePasswordController(updatePassword);

module.exports = updatePasswordController;
