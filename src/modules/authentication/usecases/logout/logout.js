const { LogoutResponseDTO } = require('./../../dto/logoutDTO');

class Logout {
  constructor(sessionService) {
    this.SessionService = sessionService;
  }

  async execute(input) {
    try {
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
