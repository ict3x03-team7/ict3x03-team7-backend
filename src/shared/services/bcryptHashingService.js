const IHashingService = require('./iHashingService');

class BcryptHashingService extends IHashingService {
  constructor(hashLibrary) {
    super();
    this.HashLibrary = hashLibrary;
  }

  async hashing(passwordString) {
    const hashedPassword = await this.HashLibrary.hash(passwordString, 13);
    return hashedPassword;
  }
  async compare(passwordString, hashedPassword) {
    const isVerified = await this.HashLibrary.compare(passwordString, hashedPassword);
    return isVerified;
  }
}

module.exports = BcryptHashingService;
