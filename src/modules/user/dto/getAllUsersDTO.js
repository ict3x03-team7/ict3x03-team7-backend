// class GetUserRequestDTO {
//   constructor(userID) {
//     this.userID = userID;
//   }
// }

class GetAllUsersResponseDTO {
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
  }
}

module.exports = { GetAllUsersResponseDTO };
