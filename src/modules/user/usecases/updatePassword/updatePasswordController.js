const { UpdatePasswordRequestDTO } = require('../../dto/updatePasswordDTO');

class UpdatePasswordController {
  constructor(updatePassword) {
    this.UpdatePassword = updatePassword;
  }

  async execute(req, res) {
    const requestDTO = new UpdatePasswordRequestDTO(req.params.userID, req.body.newPassword);

    try {
      const result = await this.UpdatePassword.execute(requestDTO);
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

module.exports = UpdatePasswordController;
