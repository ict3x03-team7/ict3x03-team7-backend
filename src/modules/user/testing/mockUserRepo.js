const IUserRepo = require('./../repositories/iUserRepo');
const { MockUserPersistance } = require('./mockUserPersistance');
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
  async addUser(
    userID,
    firstName,
    lastName,
    email,
    role,
    gender,
    mobileNumber,
    studentID,
    profilePictureLink,
  ) {
    const newUser = new MockUserPersistance(
      userID,
      firstName,
      lastName,
      email,
      role,
      gender,
      mobileNumber,
      studentID,
      profilePictureLink,
    );
    this.mockUsers.push(newUser);
    return true;
  }
  async updatePassword(userID, newHashedPassword) {
    for (const user of this.mockUsers) {
      if (user.getID() === userID) {
        return user;
      }
    }
  }
  async deleteUserByID(userID) {
    for (const user of this.mockUsers) {
      if (user.getID() === userID) {
        return true;
      }
    }
    return false;
  }
  async getAllUsers() {
    return this.mockUsers;
  }
}

module.exports = MockUserRepo;
