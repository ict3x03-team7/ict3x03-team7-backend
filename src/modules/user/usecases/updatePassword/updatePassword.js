const isValidUUIDv4 = require('../../../../shared/utils/validateUUID');
const {
  generateUUID,
  convertUUIDToBuffer,
  convertUUIDFromBuffer,
} = require('./../../../../shared/utils/generateUUID');
const UserMap = require('./../../mapper/userMap');

class UpdatePassword {
  constructor(userRepo, fileService) {
    this.UserRepo = userRepo;
    this.FileService = fileService;
  }

  async execute(input) {
    if (!isValidUUIDv4(input.userID)) {
      return { Error: 'Invalid User ID' };
    }
    let userResult;
    let profilePictureLink;
    try {
      userResult = await this.UserRepo.getUserByID(input.userID);
      if (userResult == null) return { Error: 'User Not Found' };

      if (userResult.profilePicture) {
        profilePictureLink = await this.FileService.getFile(userResult.profilePicture);
      } else {
        profilePictureLink = null;
      }

      const responseDTO = UserMap.toGetUserResponseDTO(userResult, profilePictureLink);
      return responseDTO;
    } catch (err) {
      console.error(err);
      throw new Error('Server/Database is down');
    }
  }
}

module.exports = UpdatePassword;
