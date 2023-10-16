const PrismaInstance = require('../../../../shared/infra/prisma.js');
const PrismaAuthUserRepo = require('../../repositories/prismaAuthRepo.js');
const ResetPassword = require('./resetPassword.js');
const ResetPasswordController = require('./resetPasswordController.js');
const bcrypt = require('bcrypt');
const BcryptHashingService = require('./../../../../shared/services/bcryptHashingService.js');

const prismaAuthUserRepo = new PrismaAuthUserRepo(PrismaInstance);

const bcryptHashingService = new BcryptHashingService(bcrypt);

const resetPassword = new ResetPassword(prismaAuthUserRepo, bcryptHashingService);

const resetPasswordController = new ResetPasswordController(resetPassword);

module.exports = resetPasswordController;
