const IMFAAuthenticator = require('./iMFAAuthenticator');
class GoogleAuthenticator extends IMFAAuthenticator {
  constructor(authenticator) {
    super();
    this.authenticator = authenticator;
  }

  check(tOTP, secret) {
    return this.authenticator.check(tOTP, secret);
  }
}

module.exports = GoogleAuthenticator;
