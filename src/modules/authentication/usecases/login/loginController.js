const { LoginRequestDTO } = require('./../../dto/loginDTO');

class LoginController {
  constructor(login) {
    this.Login = login;
  }

  async execute(req, res) {
    const requestDTO = new LoginRequestDTO(req.body.email, req.body.password);

    try {
      const result = await this.Login.execute(requestDTO);
      if (result.Error) {
        res.status(400).json({ result });
      } else if (result) {
        res.cookie('UserID', result.userID);
        res.status(200).json({ result });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ Error: 'Server Error' });
    }
  }
}

module.exports = LoginController;
