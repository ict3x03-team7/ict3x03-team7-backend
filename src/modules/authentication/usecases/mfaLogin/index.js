const PrismaInstance = require('../../../../shared/infra/prisma.js');
const PrismaAuthUserRepo = require('./../../repositories/prismaAuthRepo.js');
const MFALogin = require('./mfaLogin.js');
const MFALoginController = require('./mfaLoginController.js');
const { authenticator } = require('otplib');
const redisClient = require('./../../../session/redis.js');

const prismaAuthUserRepo = new PrismaAuthUserRepo(PrismaInstance);

const mfaLogin = new MFALogin(prismaAuthUserRepo, authenticator);

const mfaLoginController = new MFALoginController(mfaLogin, redisClient);

module.exports = mfaLoginController;
