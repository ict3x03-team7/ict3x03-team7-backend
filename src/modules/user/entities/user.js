const Entity = require('../../../shared/entities/entity');

class User extends Entity {
  constructor(
    id,
    firstName,
    lastName,
    email,
    password,
    role,
    gender,
    mobileNumber,
    lastLogin,
    studentID,
    profilePicture,
  ) {
    super(id);
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.role = role;
    this.gender = gender;
    this.mobileNumber = mobileNumber;
    this.lastLogin = lastLogin;
    this.studentID = studentID;
    this.profilePicture = profilePicture;
  }

  isAdmin() {
    if (this.role == 'Admin') {
      return true;
    }
    return false;
  }

  getProfilePicture() {
    return this.profilePicture;
  }
}

module.exports = User;
