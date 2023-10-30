const PrismaInstance = require('../../../../shared/infra/prisma.js');
const PrismaAuthUserRepo = require('./../../repositories/prismaAuthRepo.js');
const MFAVerify = require('./mfaVerify.js');
const MFAVerifyController = require('./mfaVerifyController.js');
const { authenticator } = require('otplib');
const GoogleAuthenticator = require('./../../../../shared/services/GoogleAuthenticator.js');
const redisClient = require('./../../../session/redis.js');

const prismaAuthUserRepo = new PrismaAuthUserRepo(PrismaInstance);

const googleAuthenticator = new GoogleAuthenticator(authenticator);

const mfaVerify = new MFAVerify(prismaAuthUserRepo, googleAuthenticator, redisClient);

const mfaVerifyController = new MFAVerifyController(mfaVerify);

module.exports = mfaVerifyController;
