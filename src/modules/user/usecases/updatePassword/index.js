const PrismaInstance = require('../../../../shared/infra/prisma.js');
const PrismaUserRepo = require('./../../repositories/prismaUserRepo.js');
const UpdatePassword = require('./updatePassword.js');
const UpdatePasswordController = require('./updatePasswordController.js');
// const S3Instance = require('./../../../../shared/infra/s3.js');
// const S3FileService = require('./../../../../shared/services/s3FileService.js');

// const s3FileService = new S3FileService(S3Instance);

const prismaUserRepo = new PrismaUserRepo(PrismaInstance);

const updatePassword = new UpdatePassword(prismaUserRepo);

const updateUserController = new UpdatePasswordController(updatePassword);

module.exports = updateUserController;
