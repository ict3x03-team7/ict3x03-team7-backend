class MockAuthUserRepo {
  constructor(mockAuthUsers) {
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
}

module.exports = MockAuthUserRepo;
