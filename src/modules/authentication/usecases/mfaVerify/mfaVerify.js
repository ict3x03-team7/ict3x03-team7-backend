const AuthUserMap = require('../../mapper/authUserMap');
const { MFAVerifyRequestDTO } = require('../../dto/mfaVerifyDTO');

class MFAVerify {
  constructor(authUserRepo, mfaAuthenticator, sessionService) {
    this.AuthUserRepo = authUserRepo;
    this.MFAAuthenticator = mfaAuthenticator;
    this.SessionService = sessionService;
  }

  async execute(input) {
    let authUserResult;
    try {
      authUserResult = await this.AuthUserRepo.getUserByEmail(input.email);
      if (authUserResult == null) return { Error: 'Invalid Credentials' };
      const MFASecret = authUserResult.mfa_secret;
      // console.log(authUserResult.id);
      // console.log(MFASecret);
      const isVerified = this.MFAAuthenticator.check(input.TOTP, MFASecret);
      // console.log(isVerified);
      const responseDTO = AuthUserMap.toMFAVerifyResponseDTO(isVerified);
      // console.log(responseDTO);
      return responseDTO;
    } catch (err) {
      console.error(err);
      throw new Error('Server/Database is down');
    }
  }
}

module.exports = MFAVerify;
