const PrismaInstance = require('../../../../shared/infra/prisma.js');
const PrismaAuthUserRepo = require('./../../repositories/prismaAuthRepo.js');
const Login = require('./login.js');
const LoginController = require('./loginController.js');
const S3Instance = require('./../../../../shared/infra/s3.js');
const S3FileService = require('./../../../../shared/services/s3FileService.js');
const redisClient = require('./../../../session/redis.js');

const s3FileService = new S3FileService(S3Instance);

const prismaAuthUserRepo = new PrismaAuthUserRepo(PrismaInstance);

const login = new Login(prismaAuthUserRepo, s3FileService);

const loginController = new LoginController(login, redisClient);

module.exports = loginController;
