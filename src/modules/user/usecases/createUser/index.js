const PrismaInstance = require('../../../../shared/infra/prisma.js');
const PrismaUserRepo = require('./../../repositories/prismaUserRepo.js');
const CreateUser = require('./createUser.js');
const bcrypt = require('bcrypt');
const BcryptHashingService = require('./../../../../shared/services/bcryptHashingService.js');
const CreateUserController = require('./createUserController.js');
const S3Instance = require('./../../../../shared/infra/s3.js');
const S3FileService = require('./../../../../shared/services/s3FileService.js');
const PrismaFileRepo = require('./../../../../shared/repositories/prismaFileRepo.js');
const { authenticator } = require('otplib');
const GoogleAuthenticator = require('./../../../../shared/services/GoogleAuthenticator.js');

const s3FileService = new S3FileService(S3Instance);

const prismaUserRepo = new PrismaUserRepo(PrismaInstance);

const prismaFileRepo = new PrismaFileRepo(PrismaInstance);

const bcryptHashingService = new BcryptHashingService(bcrypt);

const googleAuthenticator = new GoogleAuthenticator(authenticator);

const createUser = new CreateUser(
  prismaUserRepo,
  prismaFileRepo,
  s3FileService,
  bcryptHashingService,
  googleAuthenticator,
);

const createUserController = new CreateUserController(createUser);

module.exports = createUserController;
