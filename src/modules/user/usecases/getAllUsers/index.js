const PrismaInstance = require('../../../../shared/infra/prisma.js');
const PrismaUserRepo = require('./../../repositories/prismaUserRepo.js');
const GetAllUsers = require('./getAllUsers.js');
const GetAllUsersController = require('./getAllUsersController.js');
const S3Instance = require('./../../../../shared/infra/s3.js');
const S3FileService = require('./../../../../shared/services/s3FileService.js');

const s3FileService = new S3FileService(S3Instance);

const prismaUserRepo = new PrismaUserRepo(PrismaInstance);

const getAllUsers = new GetAllUsers(prismaUserRepo, s3FileService);

const getAllUsersController = new GetAllUsersController(getAllUsers);

module.exports = getAllUsersController;
