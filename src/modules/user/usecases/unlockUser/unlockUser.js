const isValidUUIDv4 = require('../../../../shared/utils/validateUUID');
const {
  generateUUID,
  convertUUIDToBuffer,
  convertUUIDFromBuffer,
} = require('./../../../../shared/utils/generateUUID');
const UserMap = require('./../../mapper/userMap');

class UnlockUser {
  constructor(userRepo, sessionService) {
    this.UserRepo = userRepo;
    this.SessionService = sessionService;
  }

  async execute(input, req) {
    if (!isValidUUIDv4(input.userID)) {
      return { Error: 'Invalid User ID' };
    }
    let userResult;
    let unlockUserResult;
    let unlockSuccess = false;
    try {
      userResult = await this.UserRepo.getUserByID(input.userID);
      if (userResult == null) return { Error: 'User Not Found' };
      if (!userResult.locked) return { Error: 'User Not Locked' };
      unlockUserResult = await this.UserRepo.unlockUser(userResult.id);
      if (unlockUserResult) {
        unlockSuccess = true;
        req.loginAttempts = 0;
        this.SessionService.del(`loginAttempts:${userResult.email}`);
      }
      const responseDTO = UserMap.toUnlockUserResponseDTO(unlockSuccess);
      return responseDTO;
    } catch (err) {
      console.error(err);
      throw new Error('Server/Database is down');
    }
  }
}

module.exports = UnlockUser;
