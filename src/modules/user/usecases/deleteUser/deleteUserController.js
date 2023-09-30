const { DeleteUserRequestDTO } = require('../../dto/deleteUserDTO');

class DeleteUserController {
  constructor(deleteUser) {
    this.DeleteUser = deleteUser;
  }

  async execute(req, res) {
    const requestDTO = new DeleteUserRequestDTO(req.params.userID);

    try {
      const result = await this.DeleteUser.execute(requestDTO);
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

module.exports = DeleteUserController;
