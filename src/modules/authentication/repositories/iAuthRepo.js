class IAuthRepo {
  constructor() {}

  async getUserByID(userID) {}

  async getUserByEmail(email) {}

  async updateMFA(userID, mfa_qr, mfa_secret) {}
}

module.exports = IAuthRepo;
