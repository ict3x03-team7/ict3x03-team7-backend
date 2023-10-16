const { ResetPasswordRequestDTO } = require('../../dto/resetPasswordDTO');
const dotenv = require('dotenv');
dotenv.config();

class ResetPasswordController {
  constructor(resetPassword) {
    this.ResetPassword = resetPassword;
  }

  async execute(req, res) {
    const requestDTO = new ResetPasswordRequestDTO(req.body.email, req.body.newPassword);
    try {
      const result = await this.ResetPassword.execute(requestDTO);
      if (!result.isSuccess) {
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

module.exports = ResetPasswordController;
