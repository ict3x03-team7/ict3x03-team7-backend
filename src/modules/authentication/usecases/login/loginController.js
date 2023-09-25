const { LoginRequestDTO } = require('./../../dto/loginDTO');
const dotenv = require('dotenv');
dotenv.config();

class LoginController {
  constructor(login, sessionService) {
    this.Login = login;
    this.SessionService = sessionService;
  }

  async execute(req, res) {
    const requestDTO = new LoginRequestDTO(req.body.email, req.body.password);

    try {
      const result = await this.Login.execute(requestDTO);
      if (result.Error) {
        res.status(400).json({ result });
      } else if (result) {
        const sessionExists = await this.SessionService.get(result.userID);
        // console.log('Existing Session:', sessionExists);
        if (sessionExists) {
          this.SessionService.del(result.userID);
          this.SessionService.del('sess:' + sessionExists);
          res.status(400).json({ Error: 'You have been logged out of all devices' });
        } else {
          let key;
          if (req.session) {
            req.session.userID = result.userID;
            req.session.role = result.role;
            key = req.sessionID;
          }
          this.SessionService.set(result.userID, key);
          this.SessionService.expire(result.userID, 60 * process.env.SESSION_TIMEOUT);
          res.status(200).json({ result });
        }
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ Error: 'Server Error' });
    }
  }
}

module.exports = LoginController;
