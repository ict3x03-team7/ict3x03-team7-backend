class CreateUserRequestDTO {
  constructor(
    userID,
    firstName,
    lastName,
    email,
    password,
    role,
    gender,
    mobileNumber,
    studentID,
    fileBase64,
    fileName,
    fileSize,
    fileType,
  ) {
    this.userID = userID;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.role = role;
    this.gender = gender;
    this.mobileNumber = mobileNumber;
    this.studentID = studentID;
    this.fileBase64 = fileBase64;
    this.metadata = {
      fileName: fileName,
      fileSize: fileSize,
      fileType: fileType,
    };
  }
}

class CreateUserResponseDTO {
  constructor(isSuccess) {
    this.isSuccess = isSuccess;
  }
}

module.exports = { CreateUserRequestDTO, CreateUserResponseDTO };
