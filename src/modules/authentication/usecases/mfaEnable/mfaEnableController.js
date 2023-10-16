const { MFAEnableRequestDTO } = require('../../dto/mfaEnableDTO');
const dotenv = require('dotenv');
dotenv.config();

class MFAEnableController {
  constructor(mfaVerify) {
    this.MFAVerify = mfaVerify;
  }

  async execute(req, res) {
    const requestDTO = new MFAEnableRequestDTO(req.session.userID);
    try {
      const result = await this.MFAVerify.execute(requestDTO);
      // console.log(result);
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
