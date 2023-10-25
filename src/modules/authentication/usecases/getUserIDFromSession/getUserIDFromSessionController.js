const dotenv = require('dotenv');
dotenv.config();

class GetUserIDFromSessionController {
  constructor(getUserIDFromSession) {
    this.GetUserIDFromSession = getUserIDFromSession;
  }

  async execute(req, res) {
    try {
      const result = await this.GetUserIDFromSession.execute(req);
      if (result.Error) {
        res.status(400).json({ result });
      } else {
        res.status(200).json({ result });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ Error: 'Server Error' });
    }
  }
}

module.exports = GetUserIDFromSessionController;
