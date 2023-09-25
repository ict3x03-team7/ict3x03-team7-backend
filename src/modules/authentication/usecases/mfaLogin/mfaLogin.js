const AuthUserMap = require('./../../mapper/authUserMap');
const { MFALoginResponseDTO } = require('./../../dto/mfaLoginDTO');

class MFALogin {
  constructor(authUserRepo, mfaAuthenticator) {
    this.AuthUserRepo = authUserRepo;
    this.MFAAuthenticator = mfaAuthenticator;
  }

  async execute(input) {
    let authUserResult;
    try {
      authUserResult = await this.AuthUserRepo.getUserByID(input.userID);
      if (authUserResult == null) return { Error: 'Invalid User ID' };
      const MFASecret = authUserResult.mfa_secret;
      // console.log(authUserResult.id);
      // console.log(MFASecret);
      const isVerified = this.MFAAuthenticator.check(input.TOTP, MFASecret);
      // console.log(isVerified);
      const responseDTO = AuthUserMap.toMFALoginResponseDTO(isVerified);
      // console.log(responseDTO);
      return responseDTO;
    } catch (err) {
      console.error(err);
      throw new Error('Server/Database is down');
    }
  }
}

module.exports = MFALogin;
