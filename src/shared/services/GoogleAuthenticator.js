const IMFAAuthenticator = require('./iMFAAuthenticator');
const qrcode = require('qrcode');
class GoogleAuthenticator extends IMFAAuthenticator {
  constructor(authenticator) {
    super();
    this.authenticator = authenticator;
  }

  check(tOTP, secret) {
    return this.authenticator.check(tOTP, secret);
  }

  async enable(userName) {
    const mfa_secret = this.authenticator.generateSecret();

    const uri = this.authenticator.keyuri(userName, 'SITRecipe', mfa_secret);

    const mfa_qr = await qrcode.toDataURL(uri);

    return {
      mfa_secret: mfa_secret,
      mfa_qr: mfa_qr,
    };
  }
}

module.exports = GoogleAuthenticator;
