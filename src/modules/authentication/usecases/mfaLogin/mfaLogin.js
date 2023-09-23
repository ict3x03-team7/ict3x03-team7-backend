const bcrypt = require('bcrypt');
const isValidEmail = require('./../../../../shared/utils/validateEmail');
const AuthUserMap = require('./../../mapper/authUserMap');
const { MFALoginResponseDTO } = require('./../../dto/mfaLoginDTO');

class MFALogin {
  constructor(authUserRepo, authenticator) {
    this.AuthUserRepo = authUserRepo;
    this.Authenticator = authenticator;
  }

  async execute(input) {
    let authUserResult;
    try {
      authUserResult = await this.AuthUserRepo.getUserByID(input.userID);
      if (authUserResult == null) return { Error: 'Invalid User ID' };
      const MFASecret = authUserResult.mfa_secret;
      console.log(authUserResult.id);
      // console.log(MFASecret);
      const isVerified = this.Authenticator.check(input.TOTP, MFASecret);
      console.log(isVerified);
      const responseDTO = null;
      return responseDTO;
    } catch (err) {
      console.error(err);
      throw new Error('Server/Database is down');
    }
  }
}

module.exports = MFALogin;
