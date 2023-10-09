const PrismaInstance = require('../../../../shared/infra/prisma.js');
const PrismaAuthUserRepo = require('./../../repositories/prismaAuthRepo.js');
const Login = require('./login.js');
const LoginController = require('./loginController.js');
const S3Instance = require('./../../../../shared/infra/s3.js');
const S3FileService = require('./../../../../shared/services/s3FileService.js');
const redisClient = require('./../../../session/redis.js');
const bcrypt = require('bcrypt');
const BcryptHashingService = require('./../../../../shared/services/bcryptHashingService.js');

const s3FileService = new S3FileService(S3Instance);

const prismaAuthUserRepo = new PrismaAuthUserRepo(PrismaInstance);

const bcryptHashingService = new BcryptHashingService(bcrypt);

const login = new Login(prismaAuthUserRepo, bcryptHashingService, redisClient);

const loginController = new LoginController(login);

module.exports = loginController;
