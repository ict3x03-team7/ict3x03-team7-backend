const isValidUUIDv4 = require('../../../../shared/utils/validateUUID');
const {
  generateUUID,
  convertUUIDToBuffer,
  convertUUIDFromBuffer,
} = require('./../../../../shared/utils/generateUUID');
const UserMap = require('./../../mapper/userMap');

class DeleteUser {
  constructor(userRepo, fileRepo, fileService) {
    this.UserRepo = userRepo;
    this.FileRepo = fileRepo;
    this.FileService = fileService;
  }

  async execute(input) {
    if (!isValidUUIDv4(input.userID)) {
      return { Error: 'Invalid User ID' };
    }
    let userResult;
    let deleteResult;
    let deleteProfilePictureResult;
    let isSuccess = false;
    try {
      userResult = await this.UserRepo.getUserByID(input.userID);
      if (userResult == null) return { Error: 'User Not Found' };
      deleteResult = await this.UserRepo.deleteUserByID(input.userID);
      if (userResult.profilePicture) {
        deleteProfilePictureResult = await this.FileService.deleteFile(userResult.profilePicture);
      }
      if (deleteResult && deleteProfilePictureResult) isSuccess = true;
      const responseDTO = UserMap.toUpdatePasswordResponseDTO(isSuccess);
      return responseDTO;
    } catch (err) {
      console.error(err);
      throw new Error('Server/Database is down');
    }
  }
}

module.exports = DeleteUser;
