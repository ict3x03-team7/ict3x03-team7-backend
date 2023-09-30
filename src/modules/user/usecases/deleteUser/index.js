const PrismaInstance = require('../../../../shared/infra/prisma.js');
const PrismaUserRepo = require('./../../repositories/prismaUserRepo.js');
const DeleteUser = require('./deleteUser.js');
const DeleteUserController = require('./deleteUserController.js');
const S3Instance = require('./../../../../shared/infra/s3.js');
const S3FileService = require('./../../../../shared/services/s3FileService.js');
const PrismaFileRepo = require('./../../../../shared/repositories/prismaFileRepo.js');

const s3FileService = new S3FileService(S3Instance);

const prismaUserRepo = new PrismaUserRepo(PrismaInstance);

const prismaFileRepo = new PrismaFileRepo(PrismaInstance);

const deleteUser = new DeleteUser(prismaUserRepo, prismaFileRepo, s3FileService);

const deleteUserController = new DeleteUserController(deleteUser);

module.exports = deleteUserController;
