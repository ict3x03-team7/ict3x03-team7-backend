class IAuthRepo {
  constructor() {}

  async getUserByID(userID) {}

  async getUserByEmail(email) {}

  async updateMFA(userID, mfa_qr, mfa_secret) {}

  async updateLastLogin(userID, lastLogin) {}
}

module.exports = IAuthRepo;
