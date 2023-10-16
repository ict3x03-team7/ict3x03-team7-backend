const PrismaInstance = require('../../../../shared/infra/prisma.js');
const PrismaAuthUserRepo = require('./../../repositories/prismaAuthRepo.js');
const VerifyEmail = require('./verifyEmail.js');
const VerifyEmailController = require('./verifyEmailController.js');

const prismaAuthUserRepo = new PrismaAuthUserRepo(PrismaInstance);

const verifyEmail = new VerifyEmail(prismaAuthUserRepo);

const verifyEmailController = new VerifyEmailController(verifyEmail);

module.exports = verifyEmailController;
