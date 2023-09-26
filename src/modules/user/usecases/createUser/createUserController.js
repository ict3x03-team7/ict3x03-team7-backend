const { CreateUserRequestDTO } = require('../../dto/createUserDTO');

class CreateUserController {
  constructor(createUser) {
    this.CreateUser = createUser;
  }

  async execute(req, res) {
    const requestDTO = new CreateUserRequestDTO(
      req.body.userID,
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.password,
      req.body.role,
      req.body.gender,
      req.body.mobileNumber,
      req.body.studentID,
      req.body.fileBase64,
      req.body.fileName,
      req.body.fileSize,
      req.body.fileType,
    );
    try {
      const result = await this.CreateUser.execute(requestDTO);
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

module.exports = CreateUserController;
