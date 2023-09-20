class MockUserRepo {
  constructor(mockUsers) {
    this.mockUsers = mockUsers;
    this.numberOfTimesGetUserIDIsCalled = 0;
  }

  async getUserByID(userID) {
    this.numberOfTimesGetUserIDIsCalled++;
    for (const user of this.mockUsers) {
      if (user.getId() === userID) {
        return user;
      }
    }
    return null;
  }
  getNumberOfTimesGetUserIDIsCalled() {
    return this.numberOfTimesGetUserIDIsCalled;
  }
}

module.exports = MockUserRepo;
