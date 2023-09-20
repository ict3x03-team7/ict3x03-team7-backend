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
}

module.exports = MockAuthUserRepo;
