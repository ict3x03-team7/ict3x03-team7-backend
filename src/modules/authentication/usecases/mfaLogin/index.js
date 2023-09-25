const PrismaInstance = require('../../../../shared/infra/prisma.js');
const PrismaAuthUserRepo = require('./../../repositories/prismaAuthRepo.js');
const MFALogin = require('./mfaLogin.js');
const MFALoginController = require('./mfaLoginController.js');
const { authenticator } = require('otplib');
const GoogleAuthenticator = require('./../../services/GoogleAuthenticator.js');
const redisClient = require('./../../../session/redis.js');

const prismaAuthUserRepo = new PrismaAuthUserRepo(PrismaInstance);

const googleAuthenticator = new GoogleAuthenticator(authenticator);

const mfaLogin = new MFALogin(prismaAuthUserRepo, googleAuthenticator);

const mfaLoginController = new MFALoginController(mfaLogin, redisClient);

module.exports = mfaLoginController;
