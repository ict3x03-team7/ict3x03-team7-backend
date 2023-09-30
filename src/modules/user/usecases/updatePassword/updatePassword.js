const isValidUUIDv4 = require('../../../../shared/utils/validateUUID');
const {
  generateUUID,
  convertUUIDToBuffer,
  convertUUIDFromBuffer,
} = require('./../../../../shared/utils/generateUUID');
const UserMap = require('./../../mapper/userMap');

class UpdatePassword {
  constructor(userRepo, hashingService) {
    this.UserRepo = userRepo;
    this.HashingService = hashingService;
  }

  async execute(input) {
    if (!isValidUUIDv4(input.userID)) {
      return { Error: 'Invalid User ID' };
    }
    let userResult;
    let isSuccess = false;
    try {
      userResult = await this.UserRepo.getUserByID(input.userID);
      if (userResult == null) return { Error: 'User Not Found' };
      const hashedPassword = await this.HashingService.hashing(input.newPassword);
      const updatePasswordResult = await this.UserRepo.updatePassword(input.userID, hashedPassword);
      if (updatePasswordResult) isSuccess = true;
      const responseDTO = UserMap.toUpdatePasswordResponseDTO(isSuccess);
      return responseDTO;
    } catch (err) {
      console.error(err);
      throw new Error('Server/Database is down');
    }
  }
}

module.exports = UpdatePassword;
