const IHashingService = require('../services/iHashingService');

class MockHashingService extends IHashingService {
  constructor() {
    super();
  }

  async hashing(passwordString) {
    const hashedPassword = passwordString;
    return hashedPassword;
  }
  async compare(passwordString, hashedPassword) {
    let isVerified = false;
    if (passwordString == hashedPassword) isVerified = true;
    return isVerified;
  }
}

module.exports = MockHashingService;
