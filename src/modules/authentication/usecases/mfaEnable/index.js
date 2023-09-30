const PrismaInstance = require('../../../../shared/infra/prisma.js');
const PrismaAuthUserRepo = require('./../../repositories/prismaAuthRepo.js');
const MFAEnable = require('./mfaEnable.js');
const MFAEnableController = require('./mfaEnableController.js');
const { authenticator } = require('otplib');
const GoogleAuthenticator = require('./../../services/GoogleAuthenticator.js');
const redisClient = require('./../../../session/redis.js');

const prismaAuthUserRepo = new PrismaAuthUserRepo(PrismaInstance);

const googleAuthenticator = new GoogleAuthenticator(authenticator);

const mfaEnable = new MFAEnable(prismaAuthUserRepo, googleAuthenticator);

const mfaEnableController = new MFAEnableController(mfaEnable, redisClient);

module.exports = mfaEnableController;
