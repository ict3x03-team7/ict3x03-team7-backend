const { MFAVerifyRequestDTO } = require('../../dto/mfaVerifyDTO');
const dotenv = require('dotenv');
dotenv.config();

class MFAVerifyController {
  constructor(mfaVerify) {
    this.MFAVerify = mfaVerify;
  }

  async execute(req, res) {
    const requestDTO = new MFAVerifyRequestDTO(req.body.email, req.body.totp);

    try {
      const result = await this.MFAVerify.execute(requestDTO);
      if (!result.isVerified) {
        res.status(401).json({ result });
      } else {
        res.status(200).json({ result });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ Error: 'Server Error' });
    }
  }
}

module.exports = MFAVerifyController;
