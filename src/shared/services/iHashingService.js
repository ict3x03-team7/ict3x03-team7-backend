class IHashingService {
  constructor() {}

  async hashing(passwordString) {}
  async compare(passwordString, hashedPassword) {}
}

module.exports = IHashingService;
