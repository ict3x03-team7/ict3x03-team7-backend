const isValidEmail = require('./../../../../shared/utils/validateEmail');
const AuthUserMap = require('./../../mapper/authUserMap');
const dotenv = require('dotenv');

dotenv.config();

class Login {
  constructor(authUserRepo, hashingService, sessionService) {
    this.AuthUserRepo = authUserRepo;
    this.HashingService = hashingService;
    this.SessionService = sessionService;
  }

  async execute(input, req) {
    if (!isValidEmail(input.email)) {
      return { Error: 'Invalid Credentials' };
    }
    let authUserResult;
    let lockUserResult;
    let updateLastLogin;
    let loginSuccess = false;
    try {
      authUserResult = await this.AuthUserRepo.getUserByEmail(input.email);
      if (authUserResult == null) return { Error: 'Invalid Credentials' };
      // console.log(req.loginAttempts);
      const isAccountLocked = authUserResult.locked;
      // console.log(isAccountLocked);
      if (isAccountLocked) {
        return { Locked: 'Your account has been locked. Please contact Admin' };
      }
      if (req.loginAttempts >= 3) {
        lockUserResult = await this.AuthUserRepo.lockUser(input.email);
        return { Locked: 'Your account has been locked. Please contact Admin' };
      }
      const isPasswordCorrect = await this.HashingService.compare(
        input.password,
        authUserResult.password,
      );
      if (!isPasswordCorrect) {
        return { Error: 'Invalid Credentials' };
      }
      if (authUserResult) loginSuccess = true;
      const responseDTO = AuthUserMap.toLoginResponseDTO(loginSuccess);
      return responseDTO;
    } catch (err) {
      console.error(err);
      throw new Error('Server/Database is down');
    }
  }
}

module.exports = Login;
