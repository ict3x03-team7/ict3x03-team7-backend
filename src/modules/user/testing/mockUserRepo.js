const IUserRepo = require('./../repositories/iUserRepo');
class MockUserRepo extends IUserRepo {
  constructor(mockUsers) {
    super();
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
