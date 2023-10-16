const IAuthRepo = require('./../repositories/iAuthRepo');
class MockAuthUserRepo extends IAuthRepo {
  constructor(mockAuthUsers) {
    super();
    this.mockAuthUsers = mockAuthUsers;
  }

  async getUserByEmail(email) {
    for (const user of this.mockAuthUsers) {
      if (user.getEmail() === email) {
        return user;
      }
    }
    return null;
  }

  async getUserByID(userID) {
    for (const user of this.mockAuthUsers) {
      if (user.getID() === userID) {
        return user;
      }
    }
  }
  async updateMFA(userID, mfa_qr, mfa_secret) {
    for (const user of this.mockAuthUsers) {
      if (user.getID() === userID) {
        user.mfa_qr = mfa_qr;
        user.mfa_secret = mfa_secret;
        return user;
      }
    }
  }
  async updateLastLogin(userID, lastLogin) {
    for (const user of this.mockAuthUsers) {
      if (user.getID() === userID) {
        return user;
      }
    }
  }
  async lockUser(email) {
    for (const user of this.mockAuthUsers) {
      if (user.getEmail() === email) {
        return user;
      }
    }
  }
  async resetPassword(email, newHashedPassword) {
    for (const user of this.mockAuthUsers) {
      if (user.getEmail() === email) {
        user.password = newHashedPassword;
        return user;
      }
    }
  }
}

module.exports = MockAuthUserRepo;
