const { MFAVerifyRequestDTO } = require('../../dto/mfaVerifyDTO');
const dotenv = require('dotenv');
dotenv.config();

class MFAEnableController {
  constructor(mfaVerify, sessionService) {
    this.MFAVerify = mfaVerify;
    this.SessionService = sessionService;
  }

  async execute(req, res) {
    const requestDTO = new MFAVerifyRequestDTO(req.session.userID);

    try {
      const result = await this.MFAVerify.execute(requestDTO);
      if (!result.isEnabled) {
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

module.exports = MFAEnableController;
