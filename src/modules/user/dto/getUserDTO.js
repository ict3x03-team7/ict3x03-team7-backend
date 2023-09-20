class GetUserRequestDTO {
  constructor(userID) {
    this.userID = userID;
  }
}

class GetUserResponseDTO {
  constructor(
    userID,
    firstName,
    lastName,
    email,
    role,
    gender,
    mobileNumber,
    lastLogin,
    studentID,
    profilePictureLink,
    mfa_qr,
  ) {
    this.userID = userID;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.role = role;
    this.gender = gender;
    this.mobileNumber = mobileNumber;
    this.lastLogin = lastLogin;
    this.studentID = studentID;
    this.profilePictureLink = profilePictureLink;
    this.mfa_qr = mfa_qr;
  }
}

module.exports = { GetUserRequestDTO, GetUserResponseDTO };
