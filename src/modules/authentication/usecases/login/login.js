const isValidEmail = require('./../../../../shared/utils/validateEmail');
const AuthUserMap = require('./../../mapper/authUserMap');

class Login {
  constructor(authUserRepo, hashingService) {
    this.AuthUserRepo = authUserRepo;
    this.HashingService = hashingService;
  }

  async execute(input) {
    if (!isValidEmail(input.email)) {
      return { Error: 'Invalid Credentials' };
    }
    let authUserResult;
    let updateLastLogin;
    try {
      authUserResult = await this.AuthUserRepo.getUserByEmail(input.email);
      if (authUserResult == null) return { Error: 'Invalid Credentials' };
      const isPasswordCorrect = await this.HashingService.compare(
        input.password,
        authUserResult.password,
      );
      if (!isPasswordCorrect) {
        return { Error: 'Invalid Credentials' };
      }
      const newLoginTime = new Date();
      updateLastLogin = await this.AuthUserRepo.updateLastLogin(authUserResult.id, newLoginTime);
      const responseDTO = AuthUserMap.toLoginResponseDTO(authUserResult);
      return responseDTO;
    } catch (err) {
      console.error(err);
      throw new Error('Server/Database is down');
    }
  }
}

module.exports = Login;
