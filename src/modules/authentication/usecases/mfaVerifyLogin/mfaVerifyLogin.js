const AuthUserMap = require('../../mapper/authUserMap');
const { MFAVerifyRequestDTO } = require('../../dto/mfaVerifyDTO');

class MFAVerifyLogin {
  constructor(authUserRepo, mfaAuthenticator, sessionService) {
    this.AuthUserRepo = authUserRepo;
    this.MFAAuthenticator = mfaAuthenticator;
    this.SessionService = sessionService;
  }

  async execute(input, req) {
    let authUserResult;
    let updateLastLogin;
    try {
      authUserResult = await this.AuthUserRepo.getUserByEmail(input.email);
      if (authUserResult == null) return { Error: 'Invalid Credentials' };
      const MFASecret = authUserResult.mfa_secret;
      // console.log(authUserResult.id);
      // console.log(MFASecret);
      const isVerified = this.MFAAuthenticator.check(input.TOTP, MFASecret);
      // console.log(isVerified);

      if (isVerified) {
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
          // res.status(200).json({ result });
        }
        if (authUserResult) {
          req.loginAttempts = 0;
          this.SessionService.del(`loginAttempts:${authUserResult.email}`);
        }
      }

      const responseDTO = AuthUserMap.toMFAVerifyResponseDTO(isVerified);
      // console.log(responseDTO);
      return responseDTO;
    } catch (err) {
      console.error(err);
      throw new Error('Server/Database is down');
    }
  }
}

module.exports = MFAVerifyLogin;
