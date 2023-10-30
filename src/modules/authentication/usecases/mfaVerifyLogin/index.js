const PrismaInstance = require('../../../../shared/infra/prisma.js');
const PrismaAuthUserRepo = require('../../repositories/prismaAuthRepo.js');
const MFAVerifyLogin = require('./mfaVerifyLogin.js');
const MFAVerifyLoginController = require('./mfaVerifyLoginController.js');
const { authenticator } = require('otplib');
const GoogleAuthenticator = require('./../../../../shared/services/GoogleAuthenticator.js');
const redisClient = require('../../../session/redis.js');

const prismaAuthUserRepo = new PrismaAuthUserRepo(PrismaInstance);

const googleAuthenticator = new GoogleAuthenticator(authenticator);

const mfaVerifyLogin = new MFAVerifyLogin(prismaAuthUserRepo, googleAuthenticator, redisClient);

const mfaVerifyLoginController = new MFAVerifyLoginController(mfaVerifyLogin);

module.exports = mfaVerifyLoginController;
