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
}

module.exports = IUserRepo;