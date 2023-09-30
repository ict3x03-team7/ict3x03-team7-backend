const AuthUserMap = require('../../mapper/authUserMap');
const { MFAEnableResponseDTO } = require('../../dto/mfaEnableDTO');

class MFAEnable {
  constructor(authUserRepo, mfaAuthenticator) {
    this.AuthUserRepo = authUserRepo;
    this.MFAAuthenticator = mfaAuthenticator;
  }

  async execute(input) {
    let authUserResult;
    let enableMFAResult;
    let isEnabled = false;
    try {
      authUserResult = await this.AuthUserRepo.getUserByID(input.userID);
      if (authUserResult == null) return { Error: 'Invalid User ID' };
      if (authUserResult.mfa_qr && authUserResult.mfa_secret)
        return { Error: 'User already has enabled MFA' };
      const userName = authUserResult.firstName + ' ' + authUserResult.lastName;
      const { mfa_secret, mfa_qr } = await this.MFAAuthenticator.enable(userName);
      enableMFAResult = await this.AuthUserRepo.updateMFA(input.userID, mfa_qr, mfa_secret);
      if (enableMFAResult) isEnabled = true;
      const responseDTO = AuthUserMap.toMFAEnableResponseDTO(isEnabled);
      return responseDTO;
    } catch (err) {
      console.error(err);
      throw new Error('Server/Database is down');
    }
  }
}

module.exports = MFAEnable;
