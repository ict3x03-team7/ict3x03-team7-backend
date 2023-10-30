const PrismaInstance = require('../../../../shared/infra/prisma.js');
const PrismaAuthUserRepo = require('./../../repositories/prismaAuthRepo.js');
const MFAEnable = require('./mfaEnable.js');
const MFAEnableController = require('./mfaEnableController.js');
const { authenticator } = require('otplib');
const GoogleAuthenticator = require('./../../../../shared/services/GoogleAuthenticator.js');
const redisClient = require('./../../../session/redis.js');

const prismaAuthUserRepo = new PrismaAuthUserRepo(PrismaInstance);

const googleAuthenticator = new GoogleAuthenticator(authenticator);

const mfaEnable = new MFAEnable(prismaAuthUserRepo, googleAuthenticator, redisClient);

const mfaEnableController = new MFAEnableController(mfaEnable);

module.exports = mfaEnableController;
