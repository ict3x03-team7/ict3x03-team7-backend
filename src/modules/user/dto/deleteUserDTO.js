class DeleteUserRequestDTO {
  constructor(userID) {
    this.userID = userID;
  }
}

class DeleteUserResponseDTO {
  constructor(isSuccess) {
    this.isSuccess = isSuccess;
  }
}

module.exports = { DeleteUserRequestDTO, DeleteUserResponseDTO };
