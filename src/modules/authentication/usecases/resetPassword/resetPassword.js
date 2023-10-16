const AuthUserMap = require('../../mapper/authUserMap');
const isValidEmail = require('../../../../shared/utils/validateEmail');

class ResetPassword {
  constructor(authUserRepo, hashingService) {
    this.AuthUserRepo = authUserRepo;
    this.HashingService = hashingService;
  }

  async execute(input) {
    if (!isValidEmail(input.email)) {
      return { Error: 'Invalid Email' };
    }
    let authUserResult;
    let resetPasswordResult;
    let isSuccess = false;
    try {
      authUserResult = await this.AuthUserRepo.getUserByEmail(input.email);
      if (authUserResult == null) return { Error: 'Invalid Credentials' };
      const hashedPassword = await this.HashingService.hashing(input.newPassword);
      resetPasswordResult = await this.AuthUserRepo.resetPassword(
        authUserResult.getEmail(),
        hashedPassword,
      );
      if (resetPasswordResult) isSuccess = true;
      const responseDTO = AuthUserMap.toResetPasswordResponseDTO(isSuccess);
      return responseDTO;
    } catch (err) {
      console.error(err);
      throw new Error('Server/Database is down');
    }
  }
}

module.exports = ResetPassword;
