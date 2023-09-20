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
    mfa_qr,
    mfa_secret,
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
    this.mfa_qr = mfa_qr;
    this.mfa_secret = mfa_secret;
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
