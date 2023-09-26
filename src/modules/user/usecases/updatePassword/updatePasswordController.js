const { GetUserRequestDTO } = require('../../dto/getUserDTO.js');

class UpdatePasswordController {
  constructor(getUser) {
    this.GetUser = getUser;
  }

  async execute(req, res) {
    const requestDTO = new GetUserRequestDTO(req.params.userID);

    try {
      const result = await this.GetUser.execute(requestDTO);
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
