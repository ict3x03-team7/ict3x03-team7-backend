const PrismaInstance = require('../../../../shared/infra/prisma.js');
const PrismaAuthUserRepo = require('../../repositories/prismaAuthRepo.js');
const ResetPassword = require('./resetPassword.js');
const ResetPasswordController = require('./resetPasswordController.js');

const prismaAuthUserRepo = new PrismaAuthUserRepo(PrismaInstance);

const resetPassword = new ResetPassword(prismaAuthUserRepo);

const resetPasswordController = new ResetPasswordController(resetPassword);

module.exports = resetPasswordController;
