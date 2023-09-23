const { MFALoginRequestDTO } = require('./../../dto/mfaLoginDTO');
const dotenv = require('dotenv');
dotenv.config();

class MFALoginController {
  constructor(mfaLogin, sessionService) {
    this.MFALogin = mfaLogin;
    this.SessionService = sessionService;
  }

  async execute(req, res) {
    const requestDTO = new MFALoginRequestDTO(req.session.userID, req.body.totp);
    console.log(requestDTO);

    try {
      const result = await this.MFALogin.execute(requestDTO);
      if (result.Error) {
        res.status(400).json({ result });
      } else if (result) {
        res.status(200).json({ result });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ Error: 'Server Error' });
    }
  }
}

module.exports = MFALoginController;
