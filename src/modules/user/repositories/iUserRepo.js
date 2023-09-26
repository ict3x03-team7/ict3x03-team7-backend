class IUserRepo {
  constructor() {}

  async getUserByID(userID) {}
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
  ) {}
  async updatePassword(userID, newHashedPassword) {}
  async deleteUserByID(userID) {}
}

module.exports = IUserRepo;
