const { GetUserRequestDTO } = require('../../dto/getUserDTO.js');

class GetAllUsersController {
  constructor(getAllUsers) {
    this.GetAllUsers = getAllUsers;
  }

  async execute(req, res) {
    try {
      const result = await this.GetAllUsers.execute();
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

module.exports = GetAllUsersController;
