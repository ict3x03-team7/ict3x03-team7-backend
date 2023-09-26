const IMFAAuthenticator = require('./../services/iMFAAuthenticator');

class MockMFAAuthenticator extends IMFAAuthenticator {
  constructor() {
    super();
    this.correctTOTP = '000111';
  }
  check(tOTP, secret) {
    if (tOTP == this.correctTOTP) return true;
    else {
      return false;
    }
  }
}

module.exports = MockMFAAuthenticator;
