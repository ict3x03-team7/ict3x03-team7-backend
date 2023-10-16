const { VerifyEmailRequestDTO } = require('../../dto/verifyEmailDTO');
const dotenv = require('dotenv');
dotenv.config();

class VerifyEmailController {
  constructor(verifyEmail) {
    this.VerifyEmail = verifyEmail;
  }

  async execute(req, res) {
    const requestDTO = new VerifyEmailRequestDTO(req.params.email);

    try {
      const result = await this.VerifyEmail.execute(requestDTO);
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

module.exports = VerifyEmailController;
