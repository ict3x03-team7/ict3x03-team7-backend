class MockUserRepo {
  constructor(mockUsers) {
    this.mockUsers = mockUsers;
  }

  async getUserByID(userID) {
    for (const user of this.mockUsers) {
      if (user.getID() === userID) {
        return user;
      }
    }
    return null;
  }
}

module.exports = MockUserRepo;
