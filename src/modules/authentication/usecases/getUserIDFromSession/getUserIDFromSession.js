class GetUserIDFromSession {
  constructor(sessionService) {
    this.SessionService = sessionService;
  }

  async execute(req) {
    if (!req.session || !req.session.userID) {
      return { Error: 'Invalid Session' };
    }
    try {
      const result = req.session.userID;
      return result;
    } catch (err) {
      console.error(err);
      throw new Error('Server/Database is down');
    }
  }
}

module.exports = GetUserIDFromSession;
