class UpdatePasswordRequestDTO {
  constructor(userID, newPassword) {
    this.userID = userID;
    this.newPassword = newPassword;
  }
}

class UpdatePasswordResponseDTO {
  constructor(isSuccess) {
    this.isSuccess = isSuccess;
  }
}

module.exports = { UpdatePasswordRequestDTO, UpdatePasswordResponseDTO };
