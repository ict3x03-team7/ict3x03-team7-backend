const { LogoutRequestDTO } = require('./../../dto/logoutDTO');
const dotenv = require('dotenv');
dotenv.config();

class LogoutController {
  constructor(logout) {
    this.Logout = logout;
  }

  async execute(req, res) {
    const requestDTO = new LogoutRequestDTO(req.session.userID, req.sessionID);

    try {
      const result = await this.Logout.execute(requestDTO);
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

module.exports = LogoutController;
