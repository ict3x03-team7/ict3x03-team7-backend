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
    let mfaEnabled = false;
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

      if (
        isPasswordCorrect &&
        !isAccountLocked &&
        !authUserResult.mfa_qr &&
        !authUserResult.mfa_secret
      ) {
        const newLoginTime = new Date();
        updateLastLogin = await this.AuthUserRepo.updateLastLogin(authUserResult.id, newLoginTime);

        const sessionExists = await this.SessionService.get(authUserResult.id);
        if (sessionExists) {
          this.SessionService.del(authUserResult.id);
          this.SessionService.del('sess:' + sessionExists);
          return { Error: 'You have been logged out of all devices' };
        } else {
          let key;
          if (req.session) {
            req.session.userID = authUserResult.id;
            req.session.role = authUserResult.role;
            key = req.sessionID;
          }
          this.SessionService.set(authUserResult.id, key);
          this.SessionService.expire(authUserResult.id, 60 * process.env.SESSION_TIMEOUT);
          req.loginAttempts = 0;
          this.SessionService.del(`loginAttempts:${authUserResult.email}`);
        }
      }

      if (isPasswordCorrect && !isAccountLocked) loginSuccess = true;
      if (authUserResult.mfa_qr && authUserResult.mfa_secret) mfaEnabled = true;
      const responseDTO = AuthUserMap.toLoginResponseDTO(loginSuccess, mfaEnabled);
      return responseDTO;
    } catch (err) {
      console.error(err);
      throw new Error('Server/Database is down');
    }
  }
}

module.exports = Login;
