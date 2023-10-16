const { UnlockUserRequestDTO } = require('../../dto/unlockUserDTO');

class UnlockUserController {
  constructor(unlockUser) {
    this.UnlockUser = unlockUser;
  }

  async execute(req, res) {
    const requestDTO = new UnlockUserRequestDTO(req.params.userID);

    try {
      const result = await this.UnlockUser.execute(requestDTO, req);
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

module.exports = UnlockUserController;
