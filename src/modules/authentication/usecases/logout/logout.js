const { LogoutResponseDTO } = require('./../../dto/logoutDTO');
const isValidUUIDv4 = require('../../../../shared/utils/validateUUID');

class Logout {
  constructor(sessionService) {
    this.SessionService = sessionService;
  }

  async execute(input) {
    try {
      if (!isValidUUIDv4(input.userID)) {
        return { Error: 'Invalid User ID' };
      }
      this.SessionService.del(input.userID);
      this.SessionService.del('sess:' + input.sessionID);
      const responseDTO = new LogoutResponseDTO(true);
      return responseDTO;
    } catch (err) {
      console.error(err);
      throw new Error('Server/Database is down');
    }
  }
}

module.exports = Logout;
