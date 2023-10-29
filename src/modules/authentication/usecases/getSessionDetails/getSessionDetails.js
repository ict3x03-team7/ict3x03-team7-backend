const AuthUserMap = require('../../mapper/authUserMap');

class GetSessionDetails {
  constructor(sessionService) {
    this.SessionService = sessionService;
  }

  async execute(input) {
    if (!input.req.session || !input.req.session.userID) {
      return { Error: 'Invalid Session' };
    }
    try {
      const sessionUserID = input.req.session.userID;
      const sessionRole = input.req.session.role;

      const responseDTO = AuthUserMap.toGetSessionDetailsResponseDTO(sessionUserID, sessionRole);
      return responseDTO;
    } catch (err) {
      console.error(err);
      throw new Error('Server/Database is down');
    }
  }
}

module.exports = GetSessionDetails;
