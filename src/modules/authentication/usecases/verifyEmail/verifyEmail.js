const AuthUserMap = require('../../mapper/authUserMap');

class VerifyEmail {
  constructor(authUserRepo) {
    this.AuthUserRepo = authUserRepo;
  }

  async execute(input) {
    let authUserResult;
    let isVerified = false;
    let mfaEnabled = false;
    try {
      authUserResult = await this.AuthUserRepo.getUserByEmail(input.email);
      if (authUserResult == null) return { Error: 'Invalid Credentials' };
      if (authUserResult) isVerified = true;
      if (authUserResult.mfa_qr && authUserResult.mfa_secret) mfaEnabled = true;
      const responseDTO = AuthUserMap.toVerifyEmailResponseDTO(isVerified, mfaEnabled);
      return responseDTO;
    } catch (err) {
      console.error(err);
      throw new Error('Server/Database is down');
    }
  }
}

module.exports = VerifyEmail;
