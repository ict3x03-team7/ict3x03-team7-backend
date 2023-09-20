const PrismaInstance = require('../../../../shared/infra/prisma.js');
const PrismaUserRepo = require('./../../repositories/prismaUserRepo.js');
const GetUser = require('./getUser.js');
const GetUserController = require('./getUserController.js');
const S3Instance = require('./../../../../shared/infra/s3.js');
const S3FileService = require('./../../../../shared/services/s3FileService.js');

const s3FileService = new S3FileService(S3Instance);

const prismaUserRepo = new PrismaUserRepo(PrismaInstance);

const getUser = new GetUser(prismaUserRepo, s3FileService);

const getUserController = new GetUserController(getUser);

module.exports = getUserController;
